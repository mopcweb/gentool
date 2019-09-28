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

// =====> Services
import { reply, removeParams } from '../services';

/* ------------------------------------------------------------------- */
/**
 *  Checks if there is a method provided for requested resource
 */
/* ------------------------------------------------------------------- */

export const checkMethod = (
  req: Request, res: Response, next: NextFunction
): Response | void => {
  const { originalUrl, method } = req;

  // Remove params form url
  const url = removeParams(originalUrl);

  // Send response for methods, which are not implemented
  if (methods.indexOf(method) === -1)
    return reply.notImplemented(req, res);

  // Iterate over each route in routes and define appropriate methods
  for (const key in routes) {
    if ((url + '/').indexOf((routes as any)[key].endPoint + '/') === -1)
      continue;

    if ((routes as any)[key].method.indexOf(method) === -1)
      return reply.notAllowed(req, res);
  }

  // Pass further if everything is ok
  next();
};
