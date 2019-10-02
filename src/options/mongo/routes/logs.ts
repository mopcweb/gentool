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
import { send } from '../services';

/* ------------------------------------------------------------------- */
/*                                GET
/* ------------------------------------------------------------------- */

router.get('/:id?', async (req, res) => {
  const { query, params } = req;
  const { id } = params;

  const logs = await new LogsController().read(query, id);

  send.ok(req, res, logs);
});

/* ------------------------------------------------------------------- */
/*                              DELETE
/* ------------------------------------------------------------------- */

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const record = await new LogsController().delete(id);

  send.ok(req, res, record);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
