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

export const addMongo = async (path: string) => {
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
  insert(path + '/package.json', pkg.mongo, pkg.mongoAfter);
  insert(path + '/package.json', pkg.winston, pkg.winstonAfter);
};

/* ------------------------------------------------------------------- */
/**
 *  Copies new files
 */
/* ------------------------------------------------------------------- */

const copyFiles = async (path: string) => {
  const source = path + '/server';

  await copy(OD.mongo + filePaths.interfaces, source + filePaths.interfaces);
  await copy(OD.mongo + filePaths.models, source + filePaths.models);
  await copy(OD.mongo + filePaths.services, source + filePaths.services);
  await copy(OD.mongo + filePaths.controllers, source + filePaths.controllers);
  await copy(OD.mongo + filePaths.routes, source + filePaths.routes);
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
    exportRecords.interfaces, exportRecords.interfacesAfter
  );
  insert(
    source + filePaths.models + '/index.ts',
    exportRecords.models
  );
  insert(
    source + filePaths.controllers + '/index.ts',
    exportRecords.controllers
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
  insert(path + '/.env', envMongo, envMongoBefore, 'b');
  insert(path + '/.env', envMongoLogLevel, 'LOG_LEVEL="debug"');
};

/* ------------------------------------------------------------------- */
/**
 *  Updates config.ts
 */
/* ------------------------------------------------------------------- */

const config = (path: string) => {
  const file = path + '/server/utils/config.ts';

  const data = read(OD.mongo + filePaths.config);

  insert(file, configApi, 'export const API = {');
  insert(file, '\n' + data, configMongoBefore, 'b');
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

  const data = read(OD.mongo + filePaths.swagger);

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
  const mongo = getSubstring(source, 'mongodb:', file);
  const links = getSubstring(source, 'links:', file);
  const env = getSubstring(source, 'environment:', file);

  if (!mongo.start)
    insert(source, dockerMongo);

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
  types: `\n    "@types/mongoose": "^5.5.7",`,
  typesAfter: /"@types\/http-status": .*?,/,
  mongo: `\n    "mongoose": "^5.6.2",`,
  mongoAfter: /"http-status": .*?,/,
  winston: `\n    "winston-mongodb": "^5.0.0",`,
  winstonAfter: /"typescript": .*?,/,
};

/* ------------------------------------------------------------------- */
/*                          FilesPaths to copy
/* ------------------------------------------------------------------- */

const filePaths = {
  interfaces: '/interfaces',
  models: '/models',
  services: '/services',
  controllers: '/controllers',
  routes: '/routes',
  config: '/utils/config.ts',
  redisKeys: '/utils/redisKeys.ts',
  swagger: '/utils/swagger.ts',
};

/* ------------------------------------------------------------------- */
/*                       'export * from file' records
/* ------------------------------------------------------------------- */

const exportRecords = {
  interfaces: '\n' +
    `export * from './ILogs';` +
    '\n' +
    `export * from './ILogsController';`,
  interfacesAfter: `export * from './ILogger';`,
  models: '\n' +
    `export * from './CrudController';` +
    '\n' +
    `export * from './LogsModel';`,
  controllers: '\n' +
    `export * from './LogsController';` +
    '\n' +
    `export * from './MongoDB';`,
  routes: {
    import: '\n' + `import logs from './logs';`,
    importAfter: `import info from './info';`,
    router: '\n\n' + `router.use(routes.LOGS.endPoint, logs);`,
    routerAfter: `router.use(routes.INFO.endPoint, info);`,
  },
};

/* ------------------------------------------------------------------- */
/*                                .env
/* ------------------------------------------------------------------- */

const envApi = 'LOGS_ENDPOINT="/logs"\n';

const envApiBefore = `
#----------------------------------------------------------------------#
#                               ROUTES
#----------------------------------------------------------------------#`;

const envMongo = `
#----------------------------------------------------------------------#
#                               MONGO
#----------------------------------------------------------------------#

MONGO_USER="admin"
MONGO_PWD="qaz12345"
MONGO_HOST="localhost"
MONGO_PORT="27017"
MONGO_DB="basic_server"
MONGO_AUTH_SOURCE="admin"
`;

const envMongoBefore = `
#----------------------------------------------------------------------#
#                               LOGGER
#----------------------------------------------------------------------#`;

const envMongoLogLevel = '\nMONGO_LOG_LEVEL="error"';

/* ------------------------------------------------------------------- */
/*                        server/utils/config.ts
/* ------------------------------------------------------------------- */

const configApi = '\n  LOGS: process.env.API + process.env.LOGS_ENDPOINT,';

const configMongoBefore = `
/* ------------------------------------------------------------------- */
/*                               LOGGER
/* ------------------------------------------------------------------- */`;

/* ------------------------------------------------------------------- */
/*                        server/utils/routes.ts
/* ------------------------------------------------------------------- */

const routesData = `
  LOGS: {
    endPoint: API.LOGS,
    method: 'GET, DELETE'
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
      name: 'LOGS',
      description: 'Provides server logs, stored in DB'
    },`;

const swaggerDataAfter = `\
    {
      name: 'INFO',
      description: 'Current server info'
    },`;

/* ------------------------------------------------------------------- */
/*                       docker-compose.yml
/* ------------------------------------------------------------------- */

const dockerLinksProp = '\n' + `    links:`;
const dockerLinks = '\n' + `      - mongodb:mongodb`;

const dockerEnvProp = '\n' + `   environment:`;
const dockerEnv = `
      - MONGO_HOST=mongodb
      - MONGO_PORT=27017
      - MONGO_USER=root
      - MONGO_PWD=rootPass2ab4e199
      - MONGO_AUTH_SOURCE=admin`;

const dockerLinksEnv = `
    links:
      - mongodb:mongodb
    environment:
      - MONGO_HOST=mongodb
      - MONGO_PORT=27017
      - MONGO_USER=root
      - MONGO_PWD=rootPass2ab4e199
      - MONGO_AUTH_SOURCE=admin`;
const dockerLinksEnvAfter = 'restart: unless-stopped:0';

const dockerMongo = `
  mongodb:
    image: mongo:latest
    container_name: basic-server-mongodb
    restart: unless-stopped:0
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=rootPass2ab4e199
      - MONGO_INITDB_ROOT_DATABASE=admin
    ports:
      - "27017:27017"
    expose:
      - 27017
    command: mongod --auth
`;
