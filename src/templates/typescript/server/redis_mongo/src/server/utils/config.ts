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
  logs: process.env.API + process.env.LOGS_ENDPOINT,
  root: process.env.API
};

/* ------------------------------------------------------------------- */
/*                               Redis
/* ------------------------------------------------------------------- */

export const redisUrl = process.env.REDIS_URL;
export const redisPwd = process.env.REDIS_PWD;

/* ------------------------------------------------------------------- */
/*                              Mongo
/* ------------------------------------------------------------------- */

// =====> Config
export const mongoUser = process.env.MONGO_USER;
export const mongoPwd = process.env.MONGO_PWD;
export const mongoHost = process.env.MONGO_HOST;
export const mongoPort = process.env.MONGO_PORT;
export const mongoDB = process.env.MONGO_DB;
export const mongoLogsCollection = process.env.MONGO_LOGS_COLLECTION;
export const mongoAuthSource = process.env.MONGO_AUTH_SOURCE;

// =====> Build Mongo URI
export const mongoLogsUri =
  `mongodb://${mongoUser}:${mongoPwd}@${mongoHost}:${mongoPort}/` +
  `${mongoDB}?authSource=${mongoAuthSource}`;

// ======> Mongo options
export const MongoOpts = {
  connectTimeoutMS: 10000,
  keepAlive: true,
  reconnectInterval: 5000,
  reconnectTries: Number.MAX_VALUE,
  useFindAndModify: false,
  useNewUrlParser: true
};

/* ------------------------------------------------------------------- */
/*                               Logger
/* ------------------------------------------------------------------- */

export const logLevel = process.env.LOG_LEVEL;
export const mongoLogLevel = process.env.MONGO_LOG_LEVEL;
export const logSilent = process.env.NODE_ENV === 'testing'
  ? true
  : false;
