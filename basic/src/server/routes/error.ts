/* ################################################################### */
/*
/*  This API is provided with purpose to provide explicit responses
/*  for all error requests
/*
/* ################################################################### */

import * as express from 'express';

/**
 *   Handles error requests
 */
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Routes
import { routes as endPoints } from '../utils/routes';

// =====> Services
import { reply } from '../services';

/* ------------------------------------------------------------------- */
/*                           Handle errors
/* ------------------------------------------------------------------- */

router.all('/*', (req, res) => {
  // Response
  /* tslint:disable */
  const response = {
    message: 'Consider using one of provided API endPoints',
    endPoints
  };
  /* tslint:enable */

  // Send res
  reply.notFound(req, res, response);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
