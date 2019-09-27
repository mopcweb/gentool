/* ################################################################### */
/*
/*  Swagger config
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> Config
import { DOMAIN, VERSION, INSTANCE, API, ROUTES } from '../utils/config';

// =====> StatusCodes
import { OK } from 'http-status';

// =====> Constants
import { } from '../utils/constants';

import { definitions, responses, authHeader } from './swaggerHelpers';

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default {

  /* ------------------------------------------------------------------- */
  /*                                CONFIG
  /* ------------------------------------------------------------------- */

  swagger: '2.0',
  info: {
    description: 'This is a sample API docs Basic Typescript Server',
    version: `${VERSION} - ${INSTANCE}`,
    title: 'Basic Typescript Server - API Docs',
    contact: { email: 'your.mail@i.o' }
  },
  host: DOMAIN.replace(/http(s)?:\/\//gi, ''),
  basePath: '',
  schemes: ['http', 'https'],

  /* ------------------------------------------------------------------- */
  /*                                  TAGS
  /* ------------------------------------------------------------------- */

  tags: [
    {
      name: 'INFO',
      description: 'Current server info'
    },
    {
      name: 'HEALTH',
      description: 'ALB health check'
    },
    {
      name: 'CACHE',
      description: 'Provide ability to get cache (all records or by key), ' +
      'delete (by key) or clear'
    },
  ],

  /* ------------------------------------------------------------------- */
  /*                                 PATHS
  /* ------------------------------------------------------------------- */

  paths: {

    /* *************************** INFO ROUTE *************************** */

    [API.INFO]: {
      get: {
        tags: ['INFO'],
        summary: 'Get current server info',
        operationId: 'getInfo',
        responses: responses({
          url: API.INFO,
          title: 'Info',
          ok: {
            version: '1.0.0', instance: 'DEV',
            commit: '', dateTime: new Date().toISOString()
          }
        })
      }
    },

    /* ************************** HEALTH ROUTE ************************** */

    [ROUTES.HEALTH]: {
      get: {
        tags: ['HEALTH'],
        summary: 'Check if server is online for AWS',
        operationId: 'getHealth',
        produces: ['text/html'],
        responses: {
          [OK]: {
            description: `Health check provided`,
            schema: { type: 'string', example: 'I\'m Good!' }
          }
        }
      }
    },

    /* *************************** CACHE ROUTE ************************** */

    // =====> Get all
    [API.CACHE.ROOT]: {
      get: {
        tags: ['CACHE'],
        summary: 'Get all cache records',
        operationId: 'getCache',
        parameters: [ ...authHeader ],
        responses: responses({
          url: API.CACHE.ROOT,
          ok: [{ key: 'testKey', ttl: 123 }, { key: 'test2Key', ttl: 234 }],
        })
      }
    },

    // =====> Get by key
    [`${API.CACHE.ROOT}/{key}`]: {
      get: {
        tags: ['CACHE'],
        summary: 'Get cache record by key',
        operationId: 'getCacheRecord',
        parameters: [
          ...authHeader,
          {
            in: 'path',
            name: 'key',
            description: 'Record key',
            schema: { type: 'string' },
            required: false
          },
        ],
        responses: responses({
          url: `${API.CACHE.ROOT}/{key}`,
          ok: 'Any data: array, object, string, number',
        })
      }
    },

    // =====> Delete by key
    [`${API.CACHE.ROOT}/delete/{key}`]: {
      get: {
        tags: ['CACHE'],
        summary: 'Delete record from cache',
        operationId: 'deleteCache',
        parameters: [
          ...authHeader,
          {
            in: 'path',
            name: 'key',
            description: 'Record key',
            schema: { type: 'string' },
            required: false
          },
        ],
        responses: responses({
          url: `${API.CACHE.ROOT}/delete/{key}`,
          ok: 'Cache recored deleted by key: someKey',
        }),
      }
    },

    // =====> Clear all
    [`${API.CACHE.ROOT}/clear`]: {
      get: {
        tags: ['CACHE'],
        summary: 'Clear cache',
        operationId: 'clearCache',
        parameters: [ ...authHeader ],
        responses: responses({
          url: `${API.CACHE.ROOT}/${API.CACHE.CLEAR}`,
          ok: 'Cache successfully cleared',
          notFound: false
        }),
      }
    },

  },

  /* ------------------------------------------------------------------- */
  /*                             DEFINITIONS
  /* ------------------------------------------------------------------- */

  definitions: { ...definitions }
};
