/* ################################################################### */
/*
/*  This Service is provided with purpose of storing
/*  necessary simple funcs
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/**
 *  Converts object into FormData string
 *
 *  @param x - Object with query params key-value pairs
 */
/* ------------------------------------------------------------------- */

export const formUrlEncoded = (x: any) =>
   Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

/* ------------------------------------------------------------------- */
/**
 *  Adds zero before number
 *
 *  @param data - Number to parse
 */
/* ------------------------------------------------------------------- */

// Ex.: 4 -> 04 | 10 -> 10
export const addZero = (data: number): string =>
  +data < 10 && +data >= 0 ? '0' + data : '' + data;

/* ------------------------------------------------------------------- */
/**
 *  Checks if object isEmpty
 *
 *  @param obj - Object to check
 */
/* ------------------------------------------------------------------- */

export const isEmpty = (obj: { [x: string]: any }): boolean => {
  for (const key in obj)
    if (obj.hasOwnProperty(key))
      return false;

  return true;
};

/* ------------------------------------------------------------------- */
/**
 *  Removes params from url
 *
 *  @param url - Url to parse
 */
/* ------------------------------------------------------------------- */

export const removeParams = (url: string): string => url.replace(/\?.*/gi, '');

/* ------------------------------------------------------------------- */
/**
 *  Parses data and corrects types: from string to boolean | number
 *
 *  @param data - Data to parse
 */
/* ------------------------------------------------------------------- */

export const parseTypes = (data: any) => {
  let result: any = { };

  // Parse null
  if (data === null || data === 'null')
    result = null;

  // Parse string
  else if (typeof data === 'string')
    if (data.toLowerCase() === 'true')
      result = true;
    else if (data.toLowerCase() === 'false')
      result = false;
    else if (!isNaN(+data))
      result = +data;
    else
      result = data;

  // Parse array
  else if (Array.isArray(data))
    result = data.map(item => parseTypes(item));

  // Parse object
  else if (typeof data === 'object')
    for (const key of Object.keys(data))
      result[key] = parseTypes(data[key]);

  // Else
  else
    result = data;

  return result;
};

/* ------------------------------------------------------------------- */
/**
 *  Creates structure for data (specifically for swagger)
 *
 *  @param data - Original data object, for which there would
 *  be created a structure
 */
/* ------------------------------------------------------------------- */

export const createDataStructure = (data: any) => {
  const structure: any = { };

  if (data == null)
    structure.type = 'string';
  else if (typeof data === 'object' && data != null)
    if (Array.isArray(data)) {
      structure.type = 'array';
      structure.items = createDataStructure(data[0]);
    }
    else {
      structure.type = typeof data;
      structure.properties = { };

      for (const key of Object.keys(data))
        structure.properties[key] = createDataStructure(data[key]);
    }
  else
    structure.type = typeof data;

  return structure;
};
