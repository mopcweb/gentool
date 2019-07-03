/* ################################################################### */
/*
/*  Middleware to check if request method is implemented by server
/*
/* ################################################################### */

import { Request, Response, NextFunction } from 'express';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Routes
import { methods, routes } from '../utils/routes';

// =====> StatusCodes
import * as statusCodes from 'http-status';

// =====> Services
import { send, removeParams } from '../services';

/* ------------------------------------------------------------------- */
/*                             Middleware
/* ------------------------------------------------------------------- */

export const checkMethod = (
  req: Request, res: Response, next: NextFunction
): Response | void => {
  const { originalUrl, method, headers, query } = req;
  const { referer } = headers;

  // Remove params form url
  const url = removeParams(originalUrl);

  // Send response for methods, which are not implemented
  if (methods.indexOf(method) === -1)
    return send(
      res, statusCodes.NOT_IMPLEMENTED, statusCodes[501],
      url, method, referer, query
    );

  // Iterate over each route in routes and define appropriate methods
  for (const key in routes) {
    if ((url + '/').indexOf((routes as any)[key].endPoint + '/') === -1)
      continue;

    if ((routes as any)[key].method.indexOf(method) === -1)
      return send(
        res, statusCodes.METHOD_NOT_ALLOWED, (statusCodes as any)['405_MESSAGE'],
        url, method, referer, query
      );
  }

  // Pass further if everything is ok
  next();
};
