/* ################################################################### */
/*
/*  This Service is provided with purpose to get AWS tokens, decode it,
/*  store in cache
/*
/* ################################################################### */

import axios from 'axios';
import * as jwt from 'jsonwebtoken';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Config
import {
  awsScope as scope,
  awsGrantType as grant_type,
  awsTokenEndPoint as url
} from '../utils/config';

// =====> Redis Keys
import { awsToken } from '../utils/redisKeys';

// =====> Constants
import { awsConnectionErrorMsg } from '../utils/constants';

// =====> StatusCodes
import { BAD_REQUEST, GATEWAY_TIMEOUT } from 'http-status';

// =====> Interfaces
import { IAwsService } from '../interfaces';

// =====> Services
import { logger, formUrlEncoded, msg, CacheService } from '../services';

/* ------------------------------------------------------------------- */
/*                              Service
/* ------------------------------------------------------------------- */

export class AwsService implements IAwsService {

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
  /*                           Get Tokens
  /* ------------------------------------------------------------------- */

  public async getToken(
    clientId: string, clientSecret: string, instance: string
  ): Promise<any> {
    // Var for token
    let response: any = await this.cache.get(`${clientId}:${awsToken}`);

    if (response) {
      logger.debug(response, ['IN AWS_SERVICE: TOKEN FROM CACHE']);
      return response;
    }

    // Method
    const method = 'POST';

    // Data
    const data = formUrlEncoded({
      grant_type,
      scope,
      client_id: clientId,
      client_secret: clientSecret
    });

    // Request AWS
    await axios({ url, method, data })
      .then(res => response = res.data)
      .catch(err => response = msg(
        err && err.response ? err.response.status : GATEWAY_TIMEOUT,
        err && err.response ? err.response.data : awsConnectionErrorMsg,
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
      `${clientId}:${awsToken}`, response, response.expires_in
    );

    // Log
    logger.debug(response, ['IN AWS_SERVICE: GET AWS TOKEN']);

    // Return
    return response;
  }

  /* ------------------------------------------------------------------- */
  /*                           Decode Token
  /* ------------------------------------------------------------------- */

  public decode = (token: string) =>
    jwt.decode(token, { complete: true })

}
