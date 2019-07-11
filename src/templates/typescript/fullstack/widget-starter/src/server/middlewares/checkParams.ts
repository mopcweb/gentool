/* ################################################################### */
/*
/*  Middleware to check if request include necessary params
/*
/* ################################################################### */

import { Request, Response, NextFunction } from 'express';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import { BAD_REQUEST } from 'http-status';

// =====> Constants
import { noParamsMsg } from '../utils/constants';

// =====> Services
import { send, removeParams } from '../services';

/* ------------------------------------------------------------------- */
/*                             Middleware
/* ------------------------------------------------------------------- */

export const checkParams = (
  req: Request, res: Response, next: NextFunction
): Response | void => {
  // Get necessary request params
  const { originalUrl, method, headers, query } = req;
  const { referer } = headers;
  const { clientId, clientSecret, client, app, instance } = query;

  // Remove params form url
  const responseUrl = removeParams(originalUrl);

  // If no one pf params -> send error
  if (!clientId || !clientSecret || !client || !app || !instance)
    return send(
      res, BAD_REQUEST, noParamsMsg, responseUrl, method, referer, query
    );

  // Pass further if everything is ok
  next();
};
