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

import {
  definitions, responses, param, commonGetParams, authHeader
} from './swaggerHelpers';

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
      name: 'HEALTH',
      description: 'ALB health check'
    },
    {
      name: 'INFO',
      description: 'Current server info'
    },
  ],

  /* ------------------------------------------------------------------- */
  /*                                 PATHS
  /* ------------------------------------------------------------------- */

  paths: {

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

  },

  /* ------------------------------------------------------------------- */
  /*                             DEFINITIONS
  /* ------------------------------------------------------------------- */

  definitions: { ...definitions }
};
