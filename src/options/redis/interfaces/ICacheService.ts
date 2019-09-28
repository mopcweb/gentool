/* ################################################################### */
/**
 *  Interface for CacheService
 */
/* ################################################################### */

export interface ICacheService {
  /* ------------------------------------------------------------------- */
  /**
   *  Sets cache, Optionally with expiration
   *
   *  @param key - Key to set by
   *  @param data - Data to store
   *  @param [time] - Expiration time
   */
  /* ------------------------------------------------------------------- */
  set(key: string, data: any, time?: number): Promise<any>;

  /* ------------------------------------------------------------------- */
  /**
   *  Gets data from cache by key
   *
   *  @param key - Key to get by
   */
  /* ------------------------------------------------------------------- */
  get(key: string): Promise<any>;

  /* ------------------------------------------------------------------- */
  /**
   *  Removes data from cache by key
   *
   *  @param key - Key to delete by
   */
  /* ------------------------------------------------------------------- */
  del(key: string): Promise<any>;

  /* ------------------------------------------------------------------- */
  /**
   *  Gets all cache keys. Optionally with ttl (time to expiration)
   *
   *  @param [ttl=true] - Whether to include ttl (time to expiration)
   */
  /* ------------------------------------------------------------------- */
  getAll(ttl?: boolean): Promise<any>;

  /* ------------------------------------------------------------------- */
  /**
   *  Clears all dbs
   */
  /* ------------------------------------------------------------------- */
  clearAll(): Promise<any>;
}
