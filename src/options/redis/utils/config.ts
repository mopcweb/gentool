/* ------------------------------------------------------------------- */
/*                                API
/* ------------------------------------------------------------------- */

export const API = {
  CACHE: {
    CLEAR: process.env.CACHE_CLEAR_ENDPOINT,
    ROOT: process.env.API + process.env.CACHE_ENDPOINT
  },
};

/* ------------------------------------------------------------------- */
/*                               REDIS
/* ------------------------------------------------------------------- */

export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PWD = process.env.REDIS_PWD;
export const CACHE_EXPIRATION = +process.env.CACHE_EXPIRATION;
