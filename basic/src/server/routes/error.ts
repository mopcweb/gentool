/* ################################################################### */
/*
/*  This API is provided with purpose to provide explicit responses
/*  for all error requests
/*
/* ################################################################### */

import * as express from 'express';

// =====> Create Router instance
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Routes
import { routes as endPoints } from '../utils/routes';

// =====> StatusCodes
import { NOT_FOUND } from 'http-status';

// =====> Services
import { send, removeParams } from '../services';

/* ------------------------------------------------------------------- */
/*                           Handle errors
/* ------------------------------------------------------------------- */

router.all('/*', (req, res) => {
  const { originalUrl, method, headers, query } = req;
  const { referer } = headers;

  // Response Url
  const responseUrl = removeParams(originalUrl);

  // Response
  /* tslint:disable */
  const response = {
    message: 'Consider using one of provided API endPoints',
    endPoints
  };
  /* tslint:enable */

  // Send res
  send(res, NOT_FOUND, response, responseUrl, method, referer, query);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
