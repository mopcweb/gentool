/* ################################################################### */
/*
/*  Service for getting data from API for calendar widget (events API)
/*
/* ################################################################### */

import { Injectable } from '@angular/core';
import axios from 'axios';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Config
import { api } from '../utils/config';

// =====> StatusCodes
import * as statusCodes from 'http-status';

// =====> Services
import { ConfigService } from './config.service';

// =====> Service config
@Injectable({
  providedIn: 'root'
})

/* ------------------------------------------------------------------- */
/*                              Service
/* ------------------------------------------------------------------- */

export class DataService {

  /* ------------------------------------------------------------------- */
  /*                                Vars
  /* ------------------------------------------------------------------- */

  private profile: any;

  /* ------------------------------------------------------------------- */
  /*                             Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    private config: ConfigService
  ) { }

  /* ------------------------------------------------------------------- */
  /*                      Get data for multiple rooms
  /* ------------------------------------------------------------------- */

  public async getUserData(
    endPoint?: string, query?: { [x: string]: any }, user?: string
  ) {
    // Get creds
    const config = await this.config.get;

    // Url
    const url =
      api.delve + '/users/' + (user ? user : config.profile) + (endPoint ? endPoint : '');

    // Get data
    this.profile = await this.get(url, config.creds, query);

    // Return
    return this.profile;
  }

  /* ------------------------------------------------------------------- */
  /*                             Clear cache
  /* ------------------------------------------------------------------- */

  public clearCache = async () =>
    await this.get(`${api.cache}/clear`)

  /* ------------------------------------------------------------------- */
  /*                           Request creds
  /* ------------------------------------------------------------------- */

  private async get(
    url: string, creds?: { [x: string]: any }, query?: { [x: string]: any }
  ) {
    // Var for response
    let response: any;

    // Method
    const method = 'GET';

    // Params
    const params = { ...creds, ...query };

    // Request
    await axios({ url, method, params })
      .then(res => response = res.data.data)
      .catch(err => {
        if (err && err.response && err.response.data)
          response = err.response.data;
        else
          response = {
            status: err && err.response
              ? err.response.status
              : statusCodes.INTERNAL_SERVER_ERROR,
            statusText: err && err.response
              ? err.response.statusText
              : statusCodes[500],
          };
      });

    // Return
    return response;
  }
}
