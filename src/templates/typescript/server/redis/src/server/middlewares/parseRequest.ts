/* ################################################################### */
/*
/*  Middleware to set necessary headers
/*
/* ################################################################### */

import { Request, Response, NextFunction } from 'express';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

import { parseTypes } from '../services';

/* ------------------------------------------------------------------- */
/**
 *  Parses request: query, params, body & headers and corrects data types
 */
/* ------------------------------------------------------------------- */

export const parseRequest = (
  req: Request, res: Response, next: NextFunction
): Response | void => {
  req.query = parseTypes(req.query);
  req.params = parseTypes(req.params);
  req.body = parseTypes(req.body);
  req.headers = parseTypes(req.headers);

  // Pass further if everything is ok
  next();
};
