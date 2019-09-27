/* ################################################################### */
/*
/*  This API is provided with purpose to provide AWS
/*  the health checker response to verify that server is running
/*
/* ################################################################### */

import * as express from 'express';
import * as path from 'path';

/**
 *   Health API. Checks if server is up for ALB
 */
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                                GET
/* ------------------------------------------------------------------- */

router.get('/', (req, res) => {
  const file = path.join(__dirname, '../utils', 'health.html');

  res.sendFile(file);
});

/* ------------------------------------------------------------------- */
/*                               Export
/* ------------------------------------------------------------------- */

export default router;
