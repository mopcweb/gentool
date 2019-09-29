/* ################################################################### */
/*
/*  Service for adding Redis option to server
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// ====> Config
import { optionsDirs as OD } from '../utils/config';

// ====> Services
import { read, insert, copy } from './';

/* ------------------------------------------------------------------- */
/**
 *  Add redis
 *
 *  @param path - Project dir file path
 */
/* ------------------------------------------------------------------- */

export const addRedis = (path: string) => {
  // packageJson(path);
  // copyFiles(path);
  // env(path);
  // config(path);
  // routes(path);
  swagger(path);
};

/* ------------------------------------------------------------------- */
/**
 *  Updates package.json
 *
 *  @param path - Project dir file path
 */
/* ------------------------------------------------------------------- */

export const packageJson = (path: string) => {
  insert(path + '/package.json', pkg.types, pkg.typesAfter);
  insert(path + '/package.json', pkg.redis, pkg.redisAfter);
};

/* ------------------------------------------------------------------- */
/**
 *  Copies new files
 *
 *  @param path - Project dir file path
 */
/* ------------------------------------------------------------------- */

export const copyFiles = async (path: string) => {
  const source = path + '/server';

  // Copy service
  await copy(OD.redis + filePaths.service, source + filePaths.service);
  await copy(OD.redis + filePaths.interface, source + filePaths.interface);
  await copy(OD.redis + filePaths.redisKeys, source + filePaths.redisKeys);
};

/* ------------------------------------------------------------------- */
/**
 *  Updates .env
 *
 *  @param path - Project dir file path
 */
/* ------------------------------------------------------------------- */

export const env = (path: string) => {
  // Insert before
  insert(path + '/.env', envApi, '', envApiBefore, true);
  insert(path + '/.env', envRedis, '', envRedisBefore, true);

  // Insert after
  // insert(path, envApi, `SWAGGER_ENDPOINT="/swagger"`);
  // insert(path, envRedis, 'HEALTH_ENDPOINT="/health.html"');
};

/* ------------------------------------------------------------------- */
/**
 *  Updates config.ts
 *
 *  @param path - Project dir file path
 */
/* ------------------------------------------------------------------- */

export const config = (path: string) => {
  const file = path + '/server/utils/config.ts';

  insert(file, configApi, 'export const API = {');
  insert(file, configRedis, '', configRedisBefore, true);
};

/* ------------------------------------------------------------------- */
/**
 *  Updates config.ts
 *
 *  @param path - Project dir file path
 */
/* ------------------------------------------------------------------- */

export const routes = (path: string) => {
  const file = path + '/server/utils/routes.ts';

  insert(file, routesData, routesDataAfter);
};

/* ------------------------------------------------------------------- */
/**
 *  Updates swagger.ts
 *
 *  @param path - Project dir file path
 */
/* ------------------------------------------------------------------- */

export const swagger = (path: string) => {
  const file = path + '/server/utils/swagger.ts';

  const data = read(OD.redis + filePaths.swagger);

  insert(file, data, 'paths: {', null, true);
  insert(file, swaggerData, swaggerDataAfter);
};

/* ------------------------------------------------------------------- */
/*                             package.json
/* ------------------------------------------------------------------- */

const pkg = {
  types: `    "@types/redis": "^2.8.13",`,
  typesAfter: /"@types\/node": .*?,/,
  redis: `    "redis": "^2.8.0",`,
  redisAfter: /"http-status": .*?,/
};

/* ------------------------------------------------------------------- */
/*                          FilesPaths to copy
/* ------------------------------------------------------------------- */

const filePaths = {
  interface: '/interfaces',
  service: '/services',
  redisKeys: '/utils/redisKeys.ts',
  swagger: '/utils/swagger.ts',
};

/* ------------------------------------------------------------------- */
/*                                .env
/* ------------------------------------------------------------------- */

const envApi = `\
CACHE_ENDPOINT = "/cache"
CACHE_CLEAR_ENDPOINT="/clear"`;

const envApiBefore = `\
#----------------------------------------------------------------------#
#                               ROUTES
#----------------------------------------------------------------------#`;

const envRedis = `
#----------------------------------------------------------------------#
#                               REDIS
#----------------------------------------------------------------------#

REDIS_URL = "redis://localhost:6301"
# REDIS_PWD = "someAwesomeRedisPwd6301"

# Seconds (24 hours = (24 * 60 * 60) s)
CACHE_EXPIRATION=86400`;

const envRedisBefore = `\
#----------------------------------------------------------------------#
#                               LOGGER
#----------------------------------------------------------------------#`;

/* ------------------------------------------------------------------- */
/*                        server/utils/config.ts
/* ------------------------------------------------------------------- */

const configApi = `\
  CACHE: {
    CLEAR: process.env.CACHE_CLEAR_ENDPOINT,
    ROOT: process.env.API + process.env.CACHE_ENDPOINT
  },`;

const configRedis = `
/* ------------------------------------------------------------------- */
/*                               REDIS
/* ------------------------------------------------------------------- */

export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PWD = process.env.REDIS_PWD;
export const CACHE_EXPIRATION = +process.env.CACHE_EXPIRATION;`;

const configRedisBefore = `\
/* ------------------------------------------------------------------- */
/*                               LOGGER
/* ------------------------------------------------------------------- */`;

/* ------------------------------------------------------------------- */
/*                        server/utils/routes.ts
/* ------------------------------------------------------------------- */

const routesData = `\
  CACHE: {
    endPoint: API.CACHE.ROOT,
    method: 'GET'
  },`;

const routesDataAfter = `\
  HEALTH: {
    endPoint: ROUTES.HEALTH,
    method: 'GET'
  },`;

/* ------------------------------------------------------------------- */
/*                       server/utils/swagger.ts
/* ------------------------------------------------------------------- */

const swaggerData = `\
    {
      name: 'CACHE',
      description: 'Provide ability to get cache (all records or by key), ' +
      'delete (by key) or clear'
    },`;

const swaggerDataAfter = `\
    {
      name: 'HEALTH',
      description: 'ALB health check'
    },`;
