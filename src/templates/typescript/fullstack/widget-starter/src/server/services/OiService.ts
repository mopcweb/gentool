/* ################################################################### */
/*
/*  This Service is provided with purpose to get AWS tokens, decode it,
/*  store in cache
/*
/* ################################################################### */

import axios from 'axios';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Config
import { oiMiddlewareApi, cacheExpiration } from '../utils/config';

// =====> Redis Keys
import { oiEvents } from '../utils/redisKeys';

// =====> Constants
import { oiConnectionErrorMsg } from '../utils/constants';

// =====> StatusCodes
import { BAD_REQUEST, GATEWAY_TIMEOUT } from 'http-status';

// =====> Interfaces
import { IOiService } from '../interfaces';

// =====> Services
import { logger, msg, CacheService } from '../services';

/* ------------------------------------------------------------------- */
/*                              Service
/* ------------------------------------------------------------------- */

export class OiService implements IOiService {

  /* ------------------------------------------------------------------- */
  /*                               Vars
  /* ------------------------------------------------------------------- */

  private cache: CacheService;

  /* ------------------------------------------------------------------- */
  /*                            Constructor
  /* ------------------------------------------------------------------- */

  public constructor() {
    this.cache = new CacheService();
  }

  /* ------------------------------------------------------------------- */
  /*                            Get Events
  /* ------------------------------------------------------------------- */

  public async get(
    token: string, client: string, app: string, instance: string, query?: any,
    endPoint?: string
  ): Promise<any> {
    // Var for response
    let response: any =
      await this.cache.get(
        `${client}_${app}_${instance}_${endPoint}:${oiEvents}`
      );

    if (response) {
      logger.debug(response, ['IN OI_SERVICE: PROFILE FROM CACHE']);
      return response;
    }

    // Method
    const method = 'GET';

    // Url
    const url = oiMiddlewareApi.proxy + (endPoint ? '/' + endPoint : '');

    // Headers
    const headers = { Authorization: `Bearer ${token}` };

    // Params
    const params = { client, app, instance, ...query };

    // Remove unnesessary params
    delete params.clientId;
    delete params.clientSecret;

    // Request
    await axios({ url, method, headers, params })
      .then(res => response = res.data.data)
      .catch(err => response = msg(
        err && err.response ? err.response.status : GATEWAY_TIMEOUT,
        err && err.response && err.response.data
          ? err.response.data.data
          : oiConnectionErrorMsg,
        err && err.response ? err.response.config.url : '',
        err && err.response ? err.response.config.method : '',
        null, null,
        err && err.response ? err.response.statusText : ''
      ));

    // Return if error
    if (response.status && response.status >= BAD_REQUEST)
      return response;

    // Set cache
    await this.cache.set(
      `${client}_${app}_${instance}_${endPoint}:${oiEvents}`,
      response, cacheExpiration
    );

    // Log
    logger.debug(response, ['IN OI_SERVICE: GET PROFILE']);

    // Return
    return response;
  }

}
