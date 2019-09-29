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
import { reply, CacheService } from '../services';

/* ------------------------------------------------------------------- */
/*                            GET: Clear
/* ------------------------------------------------------------------- */

router.get(API.CACHE.CLEAR, async (req, res) => {
  // Clear cache
  await new CacheService().clearAll();

  // Send res
  reply.ok(req, res, 'Cache cleared');
});

/* ------------------------------------------------------------------- */
/*                          GET: Delete by key
/* ------------------------------------------------------------------- */

router.get('/delete/:key', async (req, res) => {
  const { key } = req.params;

  // Clear cache
  const response = await new CacheService().del(key);

  // If no response -> send error
  if (!response)
    reply.notFound(req, res);
  else
    reply.ok(req, res, `Deleted record by key: ${key}`);
});

/* ------------------------------------------------------------------- */
/*                          GET: All or by key
/* ------------------------------------------------------------------- */

router.get('/:key?', async (req, res) => {
  const { key } = req.params;

  // Clear cache
  const response = key
    ? await new CacheService().get(key)
    : await new CacheService().getAll();

  // If no response -> send error
  if (!response)
    reply.notFound(req, res);
  else
    reply.ok(req, res, response);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
