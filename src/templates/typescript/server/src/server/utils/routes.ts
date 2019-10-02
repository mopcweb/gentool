/* ################################################################### */
/*
/*  App routes
/*
/* ################################################################### */

/* tslint:disable */

import { API, ROUTES } from './config';

/* ------------------------------------------------------------------- */
/**
 *  Methods, which are implemented by server
 */
/* ------------------------------------------------------------------- */

export const methods = 'POST, GET, PUT, DELETE';

/* ------------------------------------------------------------------- */
/**
 *  App routes object for router & showApiDocs Table
 */
/* ------------------------------------------------------------------- */

export const routes = {
  HEALTH: {
    endPoint: ROUTES.HEALTH,
    method: 'GET'
  },
  INFO: {
    endPoint: API.INFO,
    method: 'GET'
  },
  SWAGGER: {
    endPoint: API.SWAGGER,
    method: 'GET'
  }
};
