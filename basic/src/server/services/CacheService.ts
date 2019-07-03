/* ################################################################### */
/*
/*  This Service is provided with purpose to cache data via RedisDB
/*
/* ################################################################### */

import * as redis from 'redis';
import { promisify } from 'util';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Interfaces
import { ICacheService } from '../interfaces';

// =====> Config
import { redisUrl, redisPwd } from '../utils/config';

// =====> Services
import { logger } from '../services';

/* ------------------------------------------------------------------- */
/*                              Service
/* ------------------------------------------------------------------- */

export class CacheService implements ICacheService {

  /* ------------------------------------------------------------------- */
  /*                               Vars
  /* ------------------------------------------------------------------- */

  public db: any;
  public connection: number;

  /* ------------------------------------------------------------------- */
  /*                            Constructor
  /* ------------------------------------------------------------------- */

  public constructor() {
    // Create connection
    this.db = redis.createClient(redisUrl, { password: redisPwd });

    // Save connection id into sharable var
    this.connection = this.db;

    // Handle success connections
    // this.db.on('connect', () =>
      // logger.debug('CONNECTED', ['REDIS: STATUS', 'magenta']));

    // Handle error connections
    this.db.on('error', (err: any) => {
      this.db.quit();
      logger.error(err, ['ERROR IN CACHE_SERVICE: REDIS ERROR']);
    });
  }

  /* ------------------------------------------------------------------- */
  /*                             Set cache
  /* ------------------------------------------------------------------- */

  // Time - 10 (seconds) -> to prevent errors when smth found in cache
  public set = async (key: string, data: any, expire?: number) => {
    // Var for result
    let result: any;

    // Make Redis.set() & expire() an async functions
    const setAsync: any = promisify(this.db.set).bind(this.db);
    const expAsync: any = promisify(this.db.expire).bind(this.db);

    // Set data to db
    await setAsync(key, JSON.stringify(data))
      .then((success: any) => result = success)
      .catch((err: any) =>
        logger.error(err, ['ERROR IN CACHE_SERVICE: SET DATA']));

    // Log if no expiration provided
    if (result && !expire)
      logger.info(data, ['IN CACHE_SERVICE: SET DATA', 'magenta']);

    // If no expiration || data not saved - return
    if (!expire || !result)
      return result;

    // Set expiration
    await expAsync(key, expire > 10 ? expire - 10 : expire)
      .then(() =>
        logger.info(
          data,
          [`IN CACHE_SERVICE: SET DATA WITH EXPIRATION - ${expire}s`, 'magenta']
        ))
      .catch((err: any) =>
        logger.error(err, ['ERROR IN CACHE_SERVICE: SET DATA']));

    // Return
    return result;
  }

  /* ------------------------------------------------------------------- */
  /*                             Get cache
  /* ------------------------------------------------------------------- */

  public get = async (key: string) => {
    // Var for result
    let result: any;

    // Make Redis.get() an async function
    const getAsync: any = promisify(this.db.get).bind(this.db);

    // Get data from db
    await getAsync(key)
      .then((success: any) => result = success)
      .catch((err: any) =>
        logger.error(err, ['ERROR IN CACHE_SERVICE: GET DATA']));

    // Parse
    try {
      if (result) result = JSON.parse(result);
    } catch (err) { logger.error(err, ['ERROR IN CACHE_SERVICE. PARSE DATA']); }

    // Return
    return result;
  }

  /* ------------------------------------------------------------------- */
  /*                          Remove cache
  /* ------------------------------------------------------------------- */

  public del = async (key: string) => {
    // Var for result
    let result: any;

    // Make Redis.del() an async function
    const delAsync: any = promisify(this.db.del).bind(this.db);

    // Delete from db
    await delAsync(key)
      .then((success: any) => result = success)
      .catch((err: any) =>
        logger.error(err, ['ERROR IN CACHE_SERVICE: DELETE DATA']));

    // Log
    if (result)
      logger.info(
        `Deleted data by [KEY] - ${key}`,
        ['IN CACHE_SERVICE: DELETE DATA', 'magenta']
      );

    // Return
    return result;
  }

  /* ------------------------------------------------------------------- */
  /*                          Clear all dbs
  /* ------------------------------------------------------------------- */

  public clearAll = async () => {
    // Var for result
    let result: any;

    // Make Redis.flushall() an async function
    const flushAsync: any = promisify(this.db.flushall).bind(this.db);

    // Clear all dbs
    await flushAsync('ASYNC')
      .then((success: any) => result = success)
      .catch((err: any) =>
        logger.error(err, ['ERROR IN CACHE_SERVICE: CLEAR ALL DBS']));

    // Log
    if (result)
      logger.info(result, ['IN CACHE_SERVICE: CLEAR ALL DBS', 'magenta']);

    // Return
    return result;
  }
}
