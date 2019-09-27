/* ################################################################### */
/*
/*  App routes
/*
/* ################################################################### */

/* tslint:disable */

import { API, ROUTES } from './config';

/* ------------------------------------------------------------------- */
/*                   Methods, which are implemented
/* ------------------------------------------------------------------- */

export const methods = 'POST, GET, PUT, DELETE';

/* ------------------------------------------------------------------- */
/*                               Routes
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
  },
  CACHE: {
    endPoint: API.CACHE.ROOT,
    method: 'GET'
  }
};
