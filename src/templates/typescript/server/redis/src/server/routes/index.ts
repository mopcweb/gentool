/* ################################################################### */
/*
/*  Routes root
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

// =====> Routes
import { routes } from '../utils/routes';

// =====> Middlewares
import { checkMethod, setHeaders } from '../middlewares';

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

import cache from './cache';
import health from './health';
import info from './info';
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

// =====> Error requests handling
router.use('/', error);

/* ------------------------------------------------------------------- */
/*                               Export
/* ------------------------------------------------------------------- */

export default router;
