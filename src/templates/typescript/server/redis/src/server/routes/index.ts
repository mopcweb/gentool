/* ################################################################### */
/*
/*  Routes root
/*
/* ################################################################### */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as swaggerUI from 'swagger-ui-express';

/**
 *  App routes
 */
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Routes
import { routes } from '../utils/routes';

// =====> Middlewares
import { checkMethod, setHeaders, parseRequest } from '../middlewares';

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

router.use(parseRequest);
router.use(setHeaders);
router.use(checkMethod);

/* ------------------------------------------------------------------- */
/*                            Import routes
/* ------------------------------------------------------------------- */

import health from './health';
import info from './info';
import swagger from './swagger';
import cache from './cache';
import error from './error';

/* ------------------------------------------------------------------- */
/*                          Implement routes
/* ------------------------------------------------------------------- */

/* *************** EXTERNAL UNPROTECTED API ENDPOINTS ************** */

router.use(routes.HEALTH.endPoint, health);

router.use(routes.INFO.endPoint, info);

router.use(routes.SWAGGER.endPoint, swaggerUI.serve, swagger);

router.use(routes.CACHE.endPoint, cache);

/* ************************* ERROR REQUESTS ************************** */

router.use('/', error);

/* ------------------------------------------------------------------- */
/*                               Export
/* ------------------------------------------------------------------- */

export default router;
