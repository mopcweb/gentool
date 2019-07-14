/* ################################################################### */
/*
/*  This API is provided with purpose to handle requests to
/*  o365 Middleware
/*
/* ################################################################### */

import * as express from 'express';

// =====> Create Router instance
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import { OK, BAD_REQUEST } from 'http-status';

// =====> Services
import { send, removeParams, AwsService, OiService } from '../services';

/* ------------------------------------------------------------------- */
/*                       GET events from 1 room
/* ------------------------------------------------------------------- */

router.get('/*', async (req, res) => {
  const { originalUrl, method, headers, query, url } = req;
  const { referer } = headers;
  const { clientId, clientSecret, client, app, instance } = query;

  // Response url
  const responseUrl = removeParams(originalUrl);

  // Get token
  const token = await new AwsService()
    .getToken(clientId, clientSecret, instance);

  // If no token -> send error
  if (token.status && token.status >= BAD_REQUEST)
    return send(
      res, token.status, token, responseUrl, method, referer, query
    );

  // Get data from middleware
  const response = await new OiService()
    .get(token.access_token, client, app, instance, query, removeParams(url));

  // If no response -> send error
  if (response.status && response.status >= BAD_REQUEST)
    return send(
      res, response.status, response.data || response,
      responseUrl, method, referer, query
    );

  // Send res
  send(res, OK, response, responseUrl, method, referer, query);
});

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
