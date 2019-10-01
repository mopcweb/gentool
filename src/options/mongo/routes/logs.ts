/* ################################################################### */
/*
/*  This API is provided with purpose to provide logs
/*
/* ################################################################### */

import * as express from 'express';

/**
 *   Logs API
 */
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Controllers
import { LogsController } from '../controllers';

// =====> Services
import { reply } from '../services';

/* ------------------------------------------------------------------- */
/*                                GET
/* ------------------------------------------------------------------- */

router.get('/:id?', async (req, res) => {
  const { query, params } = req;
  const { id } = params;

  // Request logs
  const logs = await new LogsController().read(query, id);

  // Send response
  reply.ok(req, res, logs);
});

/* ------------------------------------------------------------------- */
/*                              DELETE
/* ------------------------------------------------------------------- */

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Use controller to delete
  const record = await new LogsController().delete(id);

  // Send response
  reply.ok(req, res, record);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
