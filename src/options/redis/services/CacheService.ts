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
import { REDIS_URL, REDIS_PWD } from '../utils/config';

// =====> Services
import { logger } from '../services';

/* ------------------------------------------------------------------- */
/**
 *  This Service is provided with purpose to cache data via RedisDB
 */
/* ------------------------------------------------------------------- */

export class CacheService implements ICacheService {

  /* ------------------------------------------------------------------- */
  /*                               Vars
  /* ------------------------------------------------------------------- */

  public db: redis.RedisClient;

  /* ------------------------------------------------------------------- */
  /*                            Constructor
  /* ------------------------------------------------------------------- */

  public constructor() {
    // Create connection
    this.db = redis.createClient(REDIS_URL, { password: REDIS_PWD });

    // Handle error connections
    this.db.on('error', (err: any) => {
      logger.error(err, ['ERROR IN CACHE_SERVICE: REDIS ERROR']);
      this.db.quit();
    });

    // // On connection open
    // this.db.on('ready', (err: any) =>
    //   logger.debug('', ['REDIS: READY', 'magenta']));
    //
    // // On connection is idle
    // this.db.on('idle', (err: any) => {
    //   logger.warn('', ['REDIS: IDLE. SHUTTIN DOWN ...', 'magenta']);
    //   this.db.quit();
    // });
    //
    // // On connection end
    // this.db.on('end', (err: any) =>
    //   logger.warn('', ['REDIS: CLOSED', 'magenta']));
  }

  /* ------------------------------------------------------------------- */
  /**
   *  Sets cache, Optionally with expiration
   *
   *  @param key - Key to set by
   *  @param data - Data to store
   *  @param [time] - Expiration time
   */
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
  /**
   *  Gets data from cache by key
   *
   *  @param key - Key to get by
   */
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
  /**
   *  Removes data from cache by key
   *
   *  @param key - Key to delete by
   */
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
  /**
   *  Gets all cache keys. Optionally with ttl (time to expiration)
   *
   *  @param [ttl=true] - Whether to include ttl (time to expiration)
   */
  /* ------------------------------------------------------------------- */

  public getAll = async (ttl = true) => {
    // Var for result
    let keys: any;
    const response: any = [];

    // Make Redis.get() an async function
    const keysAsync: any = promisify(this.db.keys).bind(this.db);
    const ttlAsync: any = promisify(this.db.ttl).bind(this.db);

    // Get keys
    await keysAsync('*')
      .then((res: any) => keys = res)
      .catch((err: any) =>
        logger.error(err, ['ERROR IN CACHE_SERVICE: GET ALL']));

    // Get ttl
    for (const key of keys)
      if (ttl)
        await ttlAsync(key)
          .then((ttl: any) => response.push({ key, ttl }) )
          .catch((err: any) =>
            logger.error(err, ['ERROR IN CACHE_SERVICE: GET TTL']));
      else
        response.push({ key });

    // Return
    return response;
  }

  /* ------------------------------------------------------------------- */
  /**
   *  Clears all dbs
   */
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
