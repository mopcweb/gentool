/* ################################################################### */
/*
/*  Interface Redis CacheService
/*
/* ################################################################### */

export interface ICacheService {
  // =====> Get some data from cache
  get(key: string): Promise<any>;

  // =====> Set some data into cache
  set(key: string, data: any, time?: number): Promise<any>;

  // =====> Del data by key
  del(key: string): Promise<any>;

  // =====> Clear all dbs
  clearAll(): Promise<any>;
}
