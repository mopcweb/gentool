/* ################################################################### */
/*
/*  This API is provided with purpose to provide AWS
/*  the health checker response to verify that server is running
/*
/* ################################################################### */

import * as express from 'express';
import * as path from 'path';
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import { OK } from 'http-status';

// =====> Constants
import { healthCheckMsg } from '../utils/constants';

// =====> Services
import { logger, msg } from '../services';

/* ------------------------------------------------------------------- */
/*                                GET
/* ------------------------------------------------------------------- */

router.get('/', (req, res) => {
  const { originalUrl, method, headers, query } = req;
  const { referer } = headers;

  const file = path.join(__dirname, '../utils', 'health.html');

  logger.warn(msg(
    OK, healthCheckMsg, originalUrl, method, referer, query
  ), ['HEALTH CHECK']);

  res.sendFile(file);
});

/* ------------------------------------------------------------------- */
/*                               Export
/* ------------------------------------------------------------------- */

export default router;
