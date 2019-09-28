/* ################################################################### */
/*
/*  Service for adding Redis option to server
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// ====> Config
import { dir, optionsDirs } from '../utils/config';

// ====> Services
import { read, insert, copy } from './';

/* ------------------------------------------------------------------- */
/**
 *  Updates .env
 *
 *  @param path - File path, relatively to dir path
 */
/* ------------------------------------------------------------------- */

export const env = (path: string) => {
  // Insert before
  insert(path + '/.env', api, '', apiBefore, true);
  insert(path + '/.env', redis, '', redisBefore, true);

  // Insert after
  // insert(path, api, `SWAGGER_ENDPOINT="/swagger"`);
  // insert(path, redis, 'HEALTH_ENDPOINT="/health.html"');
};

/* ------------------------------------------------------------------- */
/**
 *  Updates package.json
 *
 *  @param path - File path, relatively to dir path
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
 *  @param path - File path, relatively to dir path
 */
/* ------------------------------------------------------------------- */

export const copyFiles = async (path: string) => {
  const source = path + '/server';

  console.log(' old >>>', optionsDirs.redis + filePaths.service);
  console.log(' new >>>', source + filePaths.service);

  // Copy service
  await copy(optionsDirs.redis + filePaths.service, source + filePaths.service);
};

/* ------------------------------------------------------------------- */
/*                               Paths
/* ------------------------------------------------------------------- */

const filePaths = {
  interface: dir + '/src/options/redis/interfaces/ICacheService.ts',
  // service: dir + '/src/options/redis/services/CacheService.ts',
  service: '/services',
  redisKeys: dir + '/src/options/redis/utils/redisKeys.ts'
};

/* ------------------------------------------------------------------- */
/*                             .env data
/* ------------------------------------------------------------------- */

const api = `\
CACHE_ENDPOINT = "/cache"
CACHE_CLEAR_ENDPOINT="/clear"`;

const apiBefore = `\
#----------------------------------------------------------------------#
#                               ROUTES
#----------------------------------------------------------------------#`;

const redis = `
#----------------------------------------------------------------------#
#                               REDIS
#----------------------------------------------------------------------#

REDIS_URL = "redis://localhost:6301"
# REDIS_PWD = "someAwesomeRedisPwd6301"

# Seconds (24 hours = (24 * 60 * 60) s)
CACHE_EXPIRATION=86400`;

const redisBefore = `\
/* ------------------------------------------------------------------- */
/*                              Logger
/* ------------------------------------------------------------------- */`;

/* ------------------------------------------------------------------- */
/*                          package.json data
/* ------------------------------------------------------------------- */

const pkg = {
  types: `    "@types/redis": "^2.8.13",`,
  typesAfter: /"@types\/node": .*?,/,
  redis: `    "redis": "^2.8.0",`,
  redisAfter: /"http-status": .*?,/
};
