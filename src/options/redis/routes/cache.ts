/* ################################################################### */
/*
/*  This API is provided with purpose to provide tools to work with
/*  server cache
/*
/* ################################################################### */

import * as express from 'express';

/**
 *   Cache API
 */
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import { API } from '../utils/config';

// =====> Services
import { send, CacheService } from '../services';

/* ------------------------------------------------------------------- */
/*                            GET: Clear
/* ------------------------------------------------------------------- */

router.get(API.CACHE.CLEAR, async (req, res) => {
  await new CacheService().clearAll();

  send.ok(req, res, 'Cache cleared');
});

/* ------------------------------------------------------------------- */
/*                          GET: Delete by key
/* ------------------------------------------------------------------- */

router.get('/delete/:key', async (req, res) => {
  const { key } = req.params;

  const response = await new CacheService().del(key);

  if (!response)
    send.notFound(req, res);
  else
    send.ok(req, res, `Deleted record by key: ${key}`);
});

/* ------------------------------------------------------------------- */
/*                          GET: All or by key
/* ------------------------------------------------------------------- */

router.get('/:key?', async (req, res) => {
  const { key } = req.params;

  const response = key
    ? await new CacheService().get(key)
    : await new CacheService().getAll();

  if (!response)
    send.notFound(req, res);
  else
    send.ok(req, res, response);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
