/* ################################################################### */
/*
/*  App routes
/*
/* ################################################################### */

/* tslint:disable */

import { api } from './config';

/* ------------------------------------------------------------------- */
/*                   Methods, which are implemented
/* ------------------------------------------------------------------- */

export const methods = 'POST, GET, PUT, DELETE';

/* ------------------------------------------------------------------- */
/*                               Routes
/* ------------------------------------------------------------------- */

export const routes = {
  HEALTH: {
    endPoint: '/health.html',
    method: 'GET'
  },
  INFO: {
    endPoint: api.info,
    method: 'GET'
  },
  CACHE: {
    endPoint: api.cache,
    method: 'GET'
  }
};
