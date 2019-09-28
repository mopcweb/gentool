/* ################################################################### */
/*
/*  Swagger config
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> Config
import { API } from '../utils/config';

// =====> StatusCodes
import {
  OK, CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN,
  NOT_FOUND, CONFLICT
} from 'http-status';

// =====> Interfaces
import { IResponsesConfig } from '../interfaces';

// =====> Services
import { msg, createDataStructure } from '../services';

/* ------------------------------------------------------------------- */
/**
 *  Common response Model
 */
/* ------------------------------------------------------------------- */

export const response = (data?: { [x: string]: any }, query = false) => query
  ? {
    type: 'object',
    properties: {
      status: { type: 'integer', format: 'int32' },
      statusText: { type: 'string' },
      requestFrom: { type: 'string' },
      method: { type: 'string' },
      endPoint: { type: 'string' },
      params: { type: 'object', properties: { someQuery: { type: 'string' } } },
      data
    },
    required: ['status', 'statusText', 'requestFrom', 'method', 'endPoint']
  }
  : {
    type: 'object',
    properties: {
      status: { type: 'integer', format: 'int32' },
      statusText: { type: 'string' },
      requestFrom: { type: 'string' },
      method: { type: 'string' },
      endPoint: { type: 'string' },
      data
    },
    required: ['status', 'statusText', 'requestFrom', 'method', 'endPoint']
  };

/* ------------------------------------------------------------------- */
/**
 *  Common Authorization header param
 */
/* ------------------------------------------------------------------- */

export const authHeader = [{
  in: 'header',
  name: 'Authorization',
  description: 'If there is no active session in browser, ' +
  'it is necessary to provide correct token',
  schema: { type: 'string', example: 'Bearer {place_your_token_here}' },
  required: false
}];

/* ------------------------------------------------------------------- */
/**
 *  Common params for GET request
 */
/* ------------------------------------------------------------------- */

export const commonGetParams = [
  {
    in: 'query',
    name: 'limit',
    description: 'Limit number of records. ' +
    'If limit === none -> will show all records. Default: 10',
    schema: { type: 'string' },
    required: false
  },
  {
    in: 'query',
    name: 'skip',
    description: 'Skip records',
    schema: { type: 'string' },
    required: false
  },
  {
    in: 'query',
    name: 'select',
    description: 'Select properties (fields) to return',
    schema: { type: 'string' },
    required: false
  },
  {
    in: 'query',
    name: 'filter',
    description: 'Filtering. Key-value pairs separated by comma. ' +
    '3rd optional prop -> operator. Example: filter=id,2 -> { id: 2 }. ' +
    'Example: filter=id,$gte,2 -> { id: { $gte: 2 } }',
    schema: { type: 'string' },
    required: false
  },
  {
    in: 'query',
    name: 'getBy',
    description: 'Property to getBy in case if trying to get by id. ' +
    'Example: /api/v1/documents/{email}?getBy=email. ' +
    'Default: id',
    schema: { type: 'string' },
    required: false
  },
  {
    in: 'query',
    name: 'sort',
    description: 'Sort order for return values. Key-value pairs ' +
    'separated by comma. Example: ?sort=email,asc. Default: id,asc',
    schema: { type: 'string' },
    required: false
  },
  {
    in: 'query',
    name: 'include',
    description: 'For cases with nested associations to include. ' +
    'Values, separated by comma. Example: /api/v1/documents?include=locations',
    schema: { type: 'string' },
    required: false
  },
];

/* ------------------------------------------------------------------- */
/**
 *  LocationId param, depending on path / query
 */
/* ------------------------------------------------------------------- */

export const locationIdParam = (inPath = true) => ({
  in: inPath ? 'path' : 'query',
  name: 'locationId',
  description: inPath
    ? 'Location id'
    : 'Select for which locationId documents to return',
  schema: { type: 'string' },
  required: inPath ? true : false
});

/* ------------------------------------------------------------------- */
/**
 *  Definitions Object
 */
/* ------------------------------------------------------------------- */

export const definitions: any = {  };

/* ------------------------------------------------------------------- */
/**
 *  Create data structure and write it into definitions
 */
/* ------------------------------------------------------------------- */

export const createAndWriteDataStructure = (data: any = '', title?: string) => {
  // Get structure
  const structure = createDataStructure(data);

  // Write
  if (title)
    // definitions[title] = response(structure);
    definitions[title] = structure;

  return structure;
};

/* ------------------------------------------------------------------- */
/**
 *  Hardcode default requestFrom
 */
/* ------------------------------------------------------------------- */

export const example = (
  status?: any, data?: any, endPoint?: string, method?: string,
  params?: any, requestFrom = 'https://some_requestor.com'
) => ({
  example: { ...msg(status, data, endPoint, method, requestFrom, params) }
});

/* ------------------------------------------------------------------- */
/**
 *  Common ok response
 */
/* ------------------------------------------------------------------- */

export const okRes = (
  endPoint: string, data?: any, method?: string, title?: string
) => ({
  [OK]: {
    description: `OK`,
    schema: {
      ...response(createAndWriteDataStructure(data, title)),
      ...example(OK, data, endPoint, method ? method : 'GET')
    }
  },
});

/* ------------------------------------------------------------------- */
/**
 *  Common created response
 */
/* ------------------------------------------------------------------- */

export const createdRes = (
  endPoint: string, data?: any, method?: string, title?: string
) => ({
  [CREATED]: {
    description: `OK`,
    schema: {
      ...response(createAndWriteDataStructure(data, title)),
      ...example(CREATED, data, endPoint, method ? method : 'GET')
    }
  },
});

/* ------------------------------------------------------------------- */
/**
 *  Common badRequest response
 */
/* ------------------------------------------------------------------- */

export const badRequestRes = (
  endPoint: string, data?: any, method?: string
) => ({
  [BAD_REQUEST]: {
    description: `Bad request`,
    schema: {
      ...response(createAndWriteDataStructure(data)),
      ...example(BAD_REQUEST, data, endPoint, method ? method : 'GET')
    }
  },
});

/* ------------------------------------------------------------------- */
/**
 *  Common unAuthorized response
 */
/* ------------------------------------------------------------------- */

export const unAuthorizedRes = (
  endPoint: string, method?: string
) => ({
  [UNAUTHORIZED]: {
    description: `Unauthorized`,
    schema: {
      ...response(createAndWriteDataStructure('')),
      ...example(
        UNAUTHORIZED, 'Unauthorized',
        endPoint, method ? method : 'GET'
      )
    }
  }
});

/* ------------------------------------------------------------------- */
/**
 *  Common forbidden response
 */
/* ------------------------------------------------------------------- */

export const forbiddenRes = (
  endPoint: string, data?: any, method?: string
) => ({
  [FORBIDDEN]: {
    description: `Forbidden`,
    schema: {
      ...response(createAndWriteDataStructure(data)),
      ...example(FORBIDDEN, data, endPoint, method ? method : 'GET')
    }
  },
});

/* ------------------------------------------------------------------- */
/**
 *  Common notFound response
 */
/* ------------------------------------------------------------------- */

export const notFoundRes = (
  endPoint: string, data?: any, method?: string
) => ({
  [NOT_FOUND]: {
    description: `Not Found`,
    schema: {
      ...response(createAndWriteDataStructure(data)),
      ...example(NOT_FOUND, data, endPoint, method ? method : 'GET')
    }
  },
});

/* ------------------------------------------------------------------- */
/**
 *  Common conflict response
 */
/* ------------------------------------------------------------------- */

export const conflictRes = (
  endPoint: string, data?: any, method?: string
) => ({
  [CONFLICT]: {
    description: `Conflict`,
    schema: {
      ...response(createAndWriteDataStructure(data)),
      ...example(CONFLICT, data, endPoint, method ? method : 'PUT')
    }
  },
});

/* ------------------------------------------------------------------- */
/**
 *  Common response object
 */
/* ------------------------------------------------------------------- */

export const responses = (opts: IResponsesConfig) => {
  // Destructure data
  const {
    url, title, method, ok, created, badRequest, unAuthorized,
    forbidden, notFound, conflict
  } = opts;

  // Var for responses
  let responses: any = { };

  // If OK (200)
  if (ok || ok === '' || opts[200] || opts[200] === '')
    responses = {
      ...responses, ...okRes(url, ok || opts[200], method, title)
    };

  // If CREATED (201)
  if (created || created === '' || opts[201] || opts[201] === '')
    responses = {
      ...responses, ...createdRes(url, created || opts[201], method, title)
    };

  // If BAD_REQUEST (400)
  if (badRequest || badRequest === '' || opts[400] || opts[400] === '')
    responses = {
      ...responses, ...badRequestRes(url, badRequest || opts[400], method)
    };

  // If UNAUTHORIZED (401) or If not info -> add unAuthorizedRes
  if (
    unAuthorized || unAuthorized === '' ||
    opts[401] || opts[401] === '' || url !== API.INFO
  )
    responses = { ...responses, ...unAuthorizedRes(url, method) };

  // If FORBIDDEN (403)
  if (forbidden || forbidden === '' || opts[403] || opts[403] === '')
    responses = {
      ...responses, ...forbiddenRes(url, forbidden || opts[403], method)
    };

  // If NOT_FOUND (404)
  if (
    (
      notFound || notFound === '' || opts[404] ||
      opts[404] === '' || !method || method === 'GET'
    ) &&
    url !== API.INFO && notFound !== false && opts[404] !== false
  )
    responses = {
      ...responses, ...notFoundRes(url, notFound || opts[404], method)
    };

  // If CONFLICT (409)
  if (conflict || conflict === '' || opts[409] || opts[409] === '')
    responses = {
      ...responses, ...conflictRes(url, conflict || opts[409], method)
    };

  return responses;
};
