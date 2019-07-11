/* ################################################################### */
/*
/*  Root router instance for app usage
/*
/* ################################################################### */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

// =====> Create Router instance
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Config
import { api } from '../utils/config';

// =====> Routes
import { routes } from '../utils/routes';

// =====> Middlewares
import { checkMethod, checkParams, setHeaders } from '../middlewares';

/* ------------------------------------------------------------------- */
/*                           Use middlewares
/* ------------------------------------------------------------------- */

// =====> Body parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// =====> CORS
router.use(cors());

/* ------------------------------------------------------------------- */
/*                         Custom middlewares
/* ------------------------------------------------------------------- */

// =====> Config app
router.use(setHeaders);

// =====> Check if there is a method provided for requested resource
router.use(checkMethod);

/* ------------------------------------------------------------------- */
/*                            Import routes
/* ------------------------------------------------------------------- */

import health from './health';
import info from './info';
import cache from './cache';
import delve from './delve';
import error from './error';

/* ------------------------------------------------------------------- */
/*                          Implement routes
/* ------------------------------------------------------------------- */

// =====> Check if server is up for AWS
router.use(routes.HEALTH.endPoint, health);

// =====> Server info
router.use(routes.INFO.endPoint, info);

// =====> Server cache
router.use(routes.CACHE.endPoint, cache);

// =====> Calendar API
router.use(routes.DELVE.endPoint, checkParams, delve);

// =====> Error requests handling
router.use(api.root, error);

/* ------------------------------------------------------------------- */
/*                               Export
/* ------------------------------------------------------------------- */

export default router;
