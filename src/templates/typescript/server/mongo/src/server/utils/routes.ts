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
    endPoint: api.health,
    method: 'GET'
  },
  INFO: {
    endPoint: api.info,
    method: 'GET'
  },
  LOGS: {
    endPoint: api.logs,
    method: 'GET, DELETE'
  }
};
