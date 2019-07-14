/* ################################################################### */
/*
/*  App config
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                            Import .env
/* ------------------------------------------------------------------- */

import * as dotenv from 'dotenv';
dotenv.config();

/* ------------------------------------------------------------------- */
/*                              Version
/* ------------------------------------------------------------------- */

export const version = process.env.VERSION;
export const instance = process.env.INSTANCE;

/* ------------------------------------------------------------------- */
/*                                Port
/* ------------------------------------------------------------------- */

export const port = process.env.PORT;

/* ------------------------------------------------------------------- */
/*                                API
/* ------------------------------------------------------------------- */

export const api = {
  cache: process.env.API + process.env.CACHE_ENDPOINT,
  health: process.env.HEALTH_ENDPOINT,
  info: process.env.INFO_ENDPOINT,
  root: process.env.API
};

/* ------------------------------------------------------------------- */
/*                               Redis
/* ------------------------------------------------------------------- */

export const redisUrl = process.env.REDIS_URL;
export const redisPwd = process.env.REDIS_PWD;

/* ------------------------------------------------------------------- */
/*                               Logger
/* ------------------------------------------------------------------- */

export const logLevel = process.env.LOG_LEVEL;
export const logSilent = process.env.NODE_ENV === 'testing'
  ? true
  : false;
