/* ################################################################### */
/*
/*  Service for adding Redis option to server
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// ====> Config
import { optionsDir as OD } from '../utils/config';

// ====> Services
import { read, insert, copy, isExists, getSubstring } from './';

/* ------------------------------------------------------------------- */
/**
 *  Adds Redis option files
 *
 *  @param path - Project dir file path
 */
/* ------------------------------------------------------------------- */

export const addRedis = async (path: string) => {
  const source = isExists(path + '/src') ? path + '/src' : path;

  packageJson(source);
  await copyFiles(source);
  addExports(source);
  env(source);
  config(source);
  routes(source);
  swagger(source);
  addDocker(source);
};

/* ------------------------------------------------------------------- */
/**
 *  Updates package.json
 */
/* ------------------------------------------------------------------- */

const packageJson = (path: string) => {
  insert(path + '/package.json', pkg.types, pkg.typesAfter);
  insert(path + '/package.json', pkg.redis, pkg.redisAfter);
};

/* ------------------------------------------------------------------- */
/**
 *  Copies new files
 */
/* ------------------------------------------------------------------- */

const copyFiles = async (path: string) => {
  const source = path + '/server';

  await copy(OD.redis + filePaths.redisKeys, source + filePaths.redisKeys);
  await copy(OD.redis + filePaths.interfaces, source + filePaths.interfaces);
  await copy(OD.redis + filePaths.services, source + filePaths.services);
  await copy(OD.redis + filePaths.routes, source + filePaths.routes);
};

/* ------------------------------------------------------------------- */
/**
 *  Adds 'export * from file' records
 */
/* ------------------------------------------------------------------- */

const addExports = (path: string) => {
  const source = path + '/server';

  insert(
    source + filePaths.interfaces + '/index.ts',
    exportRecords.interfaces, exportRecords.interfacesBefore, 'b'
  );
  insert(
    source + filePaths.services + '/index.ts',
    exportRecords.services, exportRecords.servicesBefore, 'b'
  );
  insert(
    source + filePaths.routes + '/index.ts',
    exportRecords.routes.import, exportRecords.routes.importAfter
  );
  insert(
    source + filePaths.routes + '/index.ts',
    exportRecords.routes.router, exportRecords.routes.routerAfter
  );
};

/* ------------------------------------------------------------------- */
/**
 *  Updates .env
 */
/* ------------------------------------------------------------------- */

const env = (path: string) => {
  insert(path + '/.env', envApi, envApiBefore, 'b');
  insert(path + '/.env', envRedis, envRedisBefore, 'b');
};

/* ------------------------------------------------------------------- */
/**
 *  Updates config.ts
 */
/* ------------------------------------------------------------------- */

const config = (path: string) => {
  const file = path + '/server/utils/config.ts';

  insert(file, configApi, 'export const API = {');
  insert(file, configRedis, configRedisBefore, 'b');
};

/* ------------------------------------------------------------------- */
/**
 *  Updates routes.ts
 */
/* ------------------------------------------------------------------- */

const routes = (path: string) => {
  const file = path + '/server/utils/routes.ts';

  insert(file, routesData, routesDataAfter);
};

/* ------------------------------------------------------------------- */
/**
 *  Updates swagger.ts
 */
/* ------------------------------------------------------------------- */

const swagger = (path: string) => {
  const file = path + '/server/utils/swagger.ts';

  const data = read(OD.redis + filePaths.swagger);

  insert(file, '\n' + data, 'paths: {\n');
  insert(file, swaggerData, swaggerDataAfter);
};

/* ------------------------------------------------------------------- */
/**
 *  Adds Docker files
 */
/* ------------------------------------------------------------------- */

const addDocker = (path: string) => {
  const source = path + '/docker-compose.yml';

  if (!isExists(source))
    return;

  const file = read(source);
  const redis = getSubstring(source, 'redisdb:', file);
  const links = getSubstring(source, 'links:', file);
  const env = getSubstring(source, 'environment:', file);

  if (!redis.start)
    insert(source, dockerRedis);

  if (!links.start && !env.start)
    return insert(source, dockerLinksEnv, dockerLinksEnvAfter);

  if (links.start)
    insert(source, dockerLinks, 'links:');
  else if (!links.start)
    insert(source, dockerLinksProp + dockerLinks, dockerLinksEnvAfter);

  if (env.start)
    insert(source, dockerEnv, 'environment:');
  else if (!env.start)
    insert(source, dockerEnvProp + dockerEnv, dockerLinksEnvAfter);
};

/* ------------------------------------------------------------------- */
/*                             package.json
/* ------------------------------------------------------------------- */

const pkg = {
  types: `\n    "@types/redis": "^2.8.13",`,
  typesAfter: /"@types\/node": .*?,/,
  redis: `\n    "redis": "^2.8.0",`,
  redisAfter: /"http-status": .*?,/
};

/* ------------------------------------------------------------------- */
/*                          FilesPaths to copy
/* ------------------------------------------------------------------- */

const filePaths = {
  interfaces: '/interfaces',
  services: '/services',
  routes: '/routes',
  redisKeys: '/utils/redisKeys.ts',
  swagger: '/utils/swagger.ts',
};

/* ------------------------------------------------------------------- */
/*                       'export * from file' records
/* ------------------------------------------------------------------- */

const exportRecords = {
  interfaces: `export * from './ICacheService';` + '\n',
  interfacesBefore: `export * from './ILogger';`,
  services: `export * from './CacheService';` + '\n',
  servicesBefore: `export * from './DocsApiService';`,
  routes: {
    import: '\n' + `import cache from './cache';`,
    importAfter: `import info from './info';`,
    router: '\n\n' + `router.use(routes.CACHE.endPoint, cache);`,
    routerAfter: `router.use(routes.INFO.endPoint, info);`,
  },
};

/* ------------------------------------------------------------------- */
/*                                .env
/* ------------------------------------------------------------------- */

const envApi = `\
CACHE_ENDPOINT = "/cache"
CACHE_CLEAR_ENDPOINT="/clear"
`;

const envApiBefore = `
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
CACHE_EXPIRATION=86400
`;

const envRedisBefore = `
#----------------------------------------------------------------------#
#                               LOGGER
#----------------------------------------------------------------------#`;

/* ------------------------------------------------------------------- */
/*                        server/utils/config.ts
/* ------------------------------------------------------------------- */

const configApi = `
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
export const CACHE_EXPIRATION = +process.env.CACHE_EXPIRATION;
`;

const configRedisBefore = `
/* ------------------------------------------------------------------- */
/*                               LOGGER
/* ------------------------------------------------------------------- */`;

/* ------------------------------------------------------------------- */
/*                        server/utils/routes.ts
/* ------------------------------------------------------------------- */

const routesData = `
  CACHE: {
    endPoint: API.CACHE.ROOT,
    method: 'GET'
  },`;

const routesDataAfter = `\
  INFO: {
    endPoint: API.INFO,
    method: 'GET'
  },`;

/* ------------------------------------------------------------------- */
/*                       server/utils/swagger.ts
/* ------------------------------------------------------------------- */

const swaggerData = `
    {
      name: 'CACHE',
      description: 'Provides ability to get cache (all records or by key), ' +
      'delete (by key) or clear'
    },`;

const swaggerDataAfter = `\
    {
      name: 'INFO',
      description: 'Current server info'
    },`;

/* ------------------------------------------------------------------- */
/*                       docker-compose.yml
/* ------------------------------------------------------------------- */

const dockerLinksProp = '\n\n' + `    links:`;
const dockerLinks = '\n' + `      - redisdb:redisdb`;

const dockerEnvProp = '\n' + `   environment:`;
const dockerEnv = `
      - REDIS_URL=redis://redisdb:6301
      - REDIS_PWD=redisPassw0rd42t34t4gr`;

const dockerLinksEnv = `
    links:
      - redisdb:redisdb
    environment:
      - REDIS_URL=redis://redisdb:6301
      - REDIS_PWD=redisPassw0rd42t34t4gr`;
const dockerLinksEnvAfter = 'restart: unless-stopped:0';

const dockerRedis = `
  redisdb:
    image: redis:alpine
    container_name: basic-server-redisdb
    restart: unless-stopped:0
    ports:
      - "6301:6301"
    expose:
      - 6301
    command: redis-server --port 6301 --requirepass redisPassw0rd42t34t4gr
`;
