/* ################################################################### */
/*
/*  Swagger config
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import {
  OK, CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN,
  NOT_FOUND, CONFLICT, BAD_GATEWAY, GATEWAY_TIMEOUT
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
 *  Constructor for request params
 */
/* ------------------------------------------------------------------- */

const createParam = (
  type: string, name: string, description: string,
  schema: { [x: string]: any } = { type: 'string' }, required = false
) => ({
  description,
  name,
  schema,
  required,
  in: type,
});

/* ------------------------------------------------------------------- */
/**
 *  Common request params constructor
 */
/* ------------------------------------------------------------------- */

export const param = {

  /**
   *  Alias for query param
   */
  query: (
    name: string, descr: string, schema?: { [x: string]: any },
    required?: boolean
  ) => createParam('query', name, descr, schema, required),

  /**
   *  Alias for path param
   */
  path: (
    name: string, descr: string, schema?: { [x: string]: any },
    required?: boolean
  ) => createParam('path', name, descr, schema, required),

  /**
   *  Alias for header param
   */
  header: (
    name: string, descr: string, schema?: { [x: string]: any },
    required?: boolean
  ) => createParam('header', name, descr, schema, required),

  /**
   *  Alias for body param
   */
  body: (
    name: string, descr: string, schema?: { [x: string]: any },
    required?: boolean
  ) => createParam('body', name, descr, schema, required),
};

/* ------------------------------------------------------------------- */
/**
 *  Common Authorization header param
 */
/* ------------------------------------------------------------------- */

export const authHeader = [param.header(
  'Authorization',
  'If there is no active session in browser, ' +
  'it is necessary to provide correct token',
  { type: 'string', example: 'Bearer {place_your_token_here}' }
)];

/* ------------------------------------------------------------------- */
/* Common params for GET request
/* ------------------------------------------------------------------- */

/**
 *  Limit query param
 */
export const limit = param.query(
  'limit',
  'Limit number of records. ' +
  'If limit === none -> will show all records. Default: 10'
);

/**
 *  Skip query param
 */
export const skip = param.query('skip', 'Skip records');

/**
 *  Select query param
 */
export const select = param
  .query('select', 'Select properties (fields) to return');

/**
 *  Filter query param
 */
export const filter = param.query(
  'filter',
  'Filtering. Key-value pairs separated by comma. ' +
  '3rd optional prop -> operator. Example: filter=id,2 -> { id: 2 }. ' +
  'Example: filter=id,$gte,2 -> { id: { $gte: 2 } }'
);

/**
 *  GetBy query param
 */
export const getBy = param.query(
  'getBy',
  'Property to getBy in case if trying to get by id. ' +
  'Example: /api/v1/documents/{email}?getBy=email. ' +
  'Default: id'
);

/**
 *  Sort query param
 */
export const sort = param.query(
  'sort',
  'Sort order for return values. Key-value pairs ' +
  'separated by comma. Example: ?sort=email,asc. Default: id,asc'
);

/**
 *  Include query param
 */
export const include = param.query(
  'include',
  'For cases with nested associations to include. ' +
  'Values, separated by comma. Example: /api/v1/documents?include=locations'
);

/**
 *  Common params for GET request
 */
export const commonGetParams = (exclude?: string[]) => {
  const params = [];

  if (!exclude) {
    params.push(limit);
    params.push(skip);
    params.push(select);
    params.push(filter);
    params.push(getBy);
    params.push(sort);
    params.push(include);
  }
  else {
    if (!exclude.find(item => item === 'limit'))
      params.push(limit);
    if (!exclude.find(item => item === 'skip'))
      params.push(skip);
    if (!exclude.find(item => item === 'select'))
      params.push(select);
    if (!exclude.find(item => item === 'filter'))
      params.push(filter);
    if (!exclude.find(item => item === 'getBy'))
      params.push(getBy);
    if (!exclude.find(item => item === 'sort'))
      params.push(sort);
    if (!exclude.find(item => item === 'include'))
      params.push(include);
  }

  return params;
};

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
  example: { ...msg.note(status, data, endPoint, method, requestFrom, params) }
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
 *  Common badGateway response
 */
/* ------------------------------------------------------------------- */

export const badGatewayRes = (
  endPoint: string, data?: any, method?: string
) => ({
  [BAD_GATEWAY]: {
    description: `Bad Gateway`,
    schema: {
      ...response(createAndWriteDataStructure(data)),
      ...example(BAD_GATEWAY, data, endPoint, method ? method : 'GET')
    }
  },
});

/* ------------------------------------------------------------------- */
/**
 *  Common gatewayTimeout response
 */
/* ------------------------------------------------------------------- */

export const gatewayTimeoutRes = (
  endPoint: string, data?: any, method?: string
) => ({
  [GATEWAY_TIMEOUT]: {
    description: `Gateway Timeout`,
    schema: {
      ...response(createAndWriteDataStructure(data)),
      ...example(GATEWAY_TIMEOUT, data, endPoint, method ? method : 'GET')
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
    forbidden, notFound, conflict, badGateway, gatewayTimeout
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
  if (unAuthorized || unAuthorized === '' || opts[401] || opts[401] === '')
    responses = { ...responses, ...unAuthorizedRes(url, method) };

  // If FORBIDDEN (403)
  if (forbidden || forbidden === '' || opts[403] || opts[403] === '')
    responses = {
      ...responses, ...forbiddenRes(url, forbidden || opts[403], method)
    };

  // If NOT_FOUND (404)
  if (notFound || notFound === '' || opts[404] || opts[404] === '')
    responses = {
      ...responses, ...notFoundRes(url, notFound || opts[404], method)
    };

  // If CONFLICT (409)
  if (conflict || conflict === '' || opts[409] || opts[409] === '')
    responses = {
      ...responses, ...conflictRes(url, conflict || opts[409], method)
    };

  // If BAD_GATEWAY (502)
  if (badGateway || badGateway === '' || opts[502] || opts[502] === '')
    responses = {
      ...responses, ...badGatewayRes(url, badGateway || opts[502], method)
    };

  // If GATEWAY_TIMEOUT (504)
  if (gatewayTimeout || gatewayTimeout === '' || opts[504] || opts[504] === '')
    responses = {
      ...responses,
      ...gatewayTimeoutRes(url, gatewayTimeout || opts[504], method)
    };

  return responses;
};
