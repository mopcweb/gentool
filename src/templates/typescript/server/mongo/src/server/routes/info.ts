/* ################################################################### */
/*
/*  This API is provided with purpose to provide current server version
/*  and instance
/*
/* ################################################################### */

import * as express from 'express';

// =====> Create Router instance
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import { version, instance } from '../utils/config';

// =====> StatusCodes
import { OK } from 'http-status';

// =====> Services
import { send, removeParams } from '../services';

/* ------------------------------------------------------------------- */
/*                                GET
/* ------------------------------------------------------------------- */

router.get('/', (req, res) => {
  const { originalUrl, method, headers, query } = req;
  const { referer } = headers;

  // Response url
  const responseUrl = removeParams(originalUrl);

  // Server info
  const info = { instance, version };

  // Send res
  send(res, OK, info, responseUrl, method, referer, query);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
