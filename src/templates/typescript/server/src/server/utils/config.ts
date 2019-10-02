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
/**
 *  Environment
 */
/* ------------------------------------------------------------------- */

export const NODE_ENV = process.env.NODE_ENV;

/* ------------------------------------------------------------------- */
/*                               INFO
/* ------------------------------------------------------------------- */

export const VERSION =
  process.env.LAUNCH_BRANCH &&
  process.env.LAUNCH_BRANCH.indexOf('release/') !== -1
    ? process.env.LAUNCH_BRANCH.replace('release/', '')
    : process.env.VERSION;
export const INSTANCE = process.env.INSTANCE;
export const COMMIT = process.env.LAUNCH_COMMIT || '';
export const DATE_TIME =
  process.env.LAUNCH_DATE_TIME || new Date().toISOString();

/* ------------------------------------------------------------------- */
/**
 *  App port
 */
/* ------------------------------------------------------------------- */

export const PORT = process.env.PORT;

/* ------------------------------------------------------------------- */
/**
 *  App domain
 */
/* ------------------------------------------------------------------- */

export const DOMAIN = process.env.DOMAIN;

/* ------------------------------------------------------------------- */
/**
 *  App API Endpoints
 */
/* ------------------------------------------------------------------- */

export const API = {
  INFO: process.env.API + process.env.INFO_ENDPOINT,
  ROOT: process.env.API,
  SWAGGER: process.env.API + process.env.SWAGGER_ENDPOINT,
};

/* ------------------------------------------------------------------- */
/**
 *  App routes
 */
/* ------------------------------------------------------------------- */

export const ROUTES = {
  HEALTH: process.env.HEALTH_ENDPOINT,
};

/* ------------------------------------------------------------------- */
/*                               LOGGER
/* ------------------------------------------------------------------- */

export const LOG_LEVEL = process.env.LOG_LEVEL;
export const LOG_SILENT = process.env.NODE_ENV === 'testing'
  ? true
  : false;
