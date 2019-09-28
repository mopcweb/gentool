/* ################################################################### */
/*
/*  Middleware to set necessary headers
/*
/* ################################################################### */

import { Request, Response, NextFunction } from 'express';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

import { methods } from '../utils/routes';

/* ------------------------------------------------------------------- */
/**
 *  Sets headers
 */
/* ------------------------------------------------------------------- */

export const setHeaders = (
  req: Request, res: Response, next: NextFunction
): Response | void => {
  // Allow cross origin
  res.header('Access-Control-Allow-Origin', '*');

  // Allow methods
  res.header('Access-Control-Allow-Methods', methods);

  // Allow headers
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );

  // Pass further if everything is ok
  next();
};
