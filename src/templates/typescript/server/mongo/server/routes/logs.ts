/* ################################################################### */
/*
/*  This API is provided with purpose to provide logs
/*
/* ################################################################### */

import * as express from 'express';

// =====> Create Router instance
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import { OK, BAD_REQUEST, GATEWAY_TIMEOUT } from 'http-status';

// =====> Controllers
import { DB, LogsController } from '../controllers';

// =====> Services
import { send, removeParams } from '../services';

/* ------------------------------------------------------------------- */
/*                                GET
/* ------------------------------------------------------------------- */

router.get('/', async (req, res) => {
  const { originalUrl, method, headers, query } = req;
  const { referer } = headers;
  const { start, end, skip, limit, sort } = query;

  // Response url
  const responseUrl = removeParams(originalUrl);

  // Connect DB
  const connection = await DB.connect();

  // If no connection -> send error
  if (!connection.status)
    return send(
      res, GATEWAY_TIMEOUT, connection.data, responseUrl, method, referer, query
    );

  // Request logs
  const logs = await new LogsController()
    .get(start, end, +skip ? +skip : 0, +limit ? +limit : 10, sort);

  // If error response -> send error
  if (logs.status && logs.status >= BAD_REQUEST)
    return send(res, logs.status, logs.data, responseUrl, method, referer, query);

  // Send response
  send(res, OK, logs, responseUrl, method, referer, query);
});

/* ------------------------------------------------------------------- */
/*                              DELETE
/* ------------------------------------------------------------------- */

router.delete('/:id', async (req, res) => {
  const { originalUrl, method, params, headers, query } = req;
  const { referer } = headers;
  const { id } = params;

  // Response Url
  const responseUrl = removeParams(originalUrl);

  // Connect DB
  const connection = await DB.connect();

  // If no connection -> send error
  if (!connection.status)
    return send(
      res, GATEWAY_TIMEOUT, connection.data, responseUrl, method, referer, query
    );

  // Use controller to delete
  const record = await new LogsController().delete(id);

  // If error response -> send error
  if (record.status && record.status >= BAD_REQUEST)
    return send(
      res, record.status, record.data, responseUrl, method, referer, query
    );

  // Send response
  send(res, OK, record, responseUrl, method, referer, query);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
