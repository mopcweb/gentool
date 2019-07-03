/* ################################################################### */
/*
/*  This API is provided with purpose to provide tools to work with
/*  server cache
/*
/* ################################################################### */

import * as express from 'express';

// =====> Create Router instance
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import { OK } from 'http-status';

// =====> Services
import { send, removeParams, CacheService } from '../services';

/* ------------------------------------------------------------------- */
/*                            GET: Clear
/* ------------------------------------------------------------------- */

router.get('/clear', async (req, res) => {
  const { originalUrl, method, headers, query } = req;
  const { referer } = headers;

  // Response url
  const responseUrl = removeParams(originalUrl);

  // Clear cache
  await new CacheService().clearAll();

  // Send res
  send(
    res, OK, 'Cache cleared', responseUrl, method, referer, query
  );
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
