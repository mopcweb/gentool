/* ################################################################### */
/*
/*  Config for routes & methods, which are implemented by
/*  Middleware and Big Dashboard
/*
/* ################################################################### */

/* tslint:disable */

import { api } from './config';

/* ------------------------------------------------------------------- */
/*                    Methods, implemented by server
/* ------------------------------------------------------------------- */

export const methods = 'POST, GET, PUT, DELETE';

/* ------------------------------------------------------------------- */
/*                Endpoints & routes, implemented by server
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
  CACHE: {
    endPoint: api.cache,
    method: 'GET'
  },
  DELVE: {
    endPoint: api.delve,
    method: 'GET'
  }
};
