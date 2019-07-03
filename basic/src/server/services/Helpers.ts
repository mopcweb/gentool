/* ################################################################### */
/*
/*  This Service is provided with purpose of storing
/*  necessary simple funcs
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                Convert object into FormData string
/* ------------------------------------------------------------------- */

export const formUrlEncoded = (x: any) =>
   Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

/* ------------------------------------------------------------------- */
/*                        Add zero before number
/* ------------------------------------------------------------------- */

// Ex.: 4 -> 04 | 10 -> 10
export const addZero = (data: number): string =>
  +data < 10 && +data >= 0 ? '0' + data : '' + data;

/* ------------------------------------------------------------------- */
/*                       Check if object isEmpty
/* ------------------------------------------------------------------- */

export const isEmpty = (obj: { [x: string]: any }): boolean => {
  for (const key in obj)
    if (obj.hasOwnProperty(key))
      return false;

  return true;
};

/* ------------------------------------------------------------------- */
/*                       Remove params from url
/* ------------------------------------------------------------------- */

export const removeParams = (url: string): string => url.replace(/\?.*/gi, '');
