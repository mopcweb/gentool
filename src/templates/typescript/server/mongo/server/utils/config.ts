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
  root: process.env.API,
  health: process.env.HEALTH_ENDPOINT,
  info: process.env.INFO_ENDPOINT,
  logs: process.env.LOGS_ENDPOINT,
};

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
  useNewUrlParser: true,
  useFindAndModify: false,
  keepAlive: true,
  connectTimeoutMS: 10000,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000
};

/* ------------------------------------------------------------------- */
/*                               Logger
/* ------------------------------------------------------------------- */

export const logLevel = process.env.LOG_LEVEL;
export const mongoLogLevel = process.env.MONGO_LOG_LEVEL;
export const logSilent = process.env.NODE_ENV === 'testing'
  ? true
  : false;
