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
  definitions, responses, authHeader, commonGetParams, locationIdParam
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
    description: 'This is a sample API docs for LCI Admin Portal v1',
    version: `${VERSION} - ${INSTANCE}`,
    title: 'LCI v2 - API Docs',
    contact: { email: 'danil.moroz@signet.tv' }
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
    }
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
          ok: { version: '1.0.0', instance: 'DEV' }
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

  },

  /* ------------------------------------------------------------------- */
  /*                             DEFINITIONS
  /* ------------------------------------------------------------------- */

  definitions: { ...definitions }
};
