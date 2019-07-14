/* ################################################################### */
/*
/*  App config from .env file
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                            Import .env
/* ------------------------------------------------------------------- */

import * as dotenv from 'dotenv';
dotenv.config();

/* ------------------------------------------------------------------- */
/*                            Server info
/* ------------------------------------------------------------------- */

export const version = process.env.VERSION;
export const instance = process.env.INSTANCE;

/* ------------------------------------------------------------------- */
/*                               Port
/* ------------------------------------------------------------------- */

export const port = process.env.PORT;

/* ------------------------------------------------------------------- */
/*                                API
/* ------------------------------------------------------------------- */

export const api = {
  cache: process.env.API + process.env.CACHE_ENDPOINT,
  delve: process.env.API + process.env.DELVE_ENDPOINT,
  health: process.env.HEALTH_ENDPOINT,
  info: process.env.API + process.env.INFO_ENDPOINT,
  root: process.env.API,
};

/* ------------------------------------------------------------------- */
/*              o365 (Office Integration) Middleware Config
/* ------------------------------------------------------------------- */

export const oiMiddlewareApi = {
  info: process.env.OI_MIDDLEWARE_HOST + process.env.OI_MIDDLEWARE_API_INFO,
  proxy: process.env.OI_MIDDLEWARE_HOST + process.env.OI_MIDDLEWARE_API_EWS_PROXY
};

/* ------------------------------------------------------------------- */
/*                               Redis
/* ------------------------------------------------------------------- */

export const redisUrl = process.env.REDIS_URL;
export const redisPwd = process.env.REDIS_PASSWORD;
export const cacheExpiration = +process.env.SERVER_CACHE_EXPIRATION;

/* ------------------------------------------------------------------- */
/*                            ASW config
/* ------------------------------------------------------------------- */

export const awsTokenEndPoint = process.env.AWS_TOKEN_ENDPOINT;
export const awsScope = process.env.AWS_SCOPE;
export const awsGrantType = process.env.AWS_GRANT_TYPE;

/* ------------------------------------------------------------------- */
/*                              Logger
/* ------------------------------------------------------------------- */

export const logLevel = process.env.LOG_LEVEL;
export const logSilent = process.env.NODE_ENV === 'testing'
  ? true
  : false;

/* ------------------------------------------------------------------- */
/*                               End
/* ------------------------------------------------------------------- */
