/* ################################################################### */
/*
/*  This API is provided with purpose to provide current server version
/*  and instance
/*
/* ################################################################### */

import * as express from 'express';

/**
 *   Info API. Current server info
 */
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import {
  VERSION as version, INSTANCE as instance,
  COMMIT as commit, DATE_TIME as dateTime
} from '../utils/config';

// =====> Services
import { send } from '../services';

/* ------------------------------------------------------------------- */
/*                                GET
/* ------------------------------------------------------------------- */

router.get('/', (req, res) => {
  // Server info
  const info = { instance, version, commit, dateTime };

  // Send res
  send.ok(req, res, info);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
