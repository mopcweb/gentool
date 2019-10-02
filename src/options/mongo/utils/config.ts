/* ------------------------------------------------------------------- */
/**
 *  MongoDB config
 */
/* ------------------------------------------------------------------- */

export const MONGO = {
  AUTH_SOURCE: process.env.MONGO_AUTH_SOURCE,
  COLLECTIONS: {
    LOGS: 'logs',
  },
  DB: process.env.MONGO_DB,
  DEFAULT: {
    GET_BY: '_id',
    LIMIT: 10,
    SKIP: 0
  },
  HOST: process.env.MONGO_HOST,
  LOG_LEVEL: process.env.MONGO_LOG_LEVEL,
  OPTIONS: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    keepAlive: true,
    connectTimeoutMS: 10000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 5000
  },
  PORT: process.env.MONGO_PORT,
  PWD: process.env.MONGO_PWD,
  USER: process.env.MONGO_USER,
};

/**
 *  MongoDB URI
 */
export const MONGO_DB_URI = `mongodb://${MONGO.USER}:${MONGO.PWD}` +
  `@${MONGO.HOST}:${MONGO.PORT}/${MONGO.DB}?authSource=${MONGO.AUTH_SOURCE}`;
