/* ################################################################### */
/*
/*  This Service is provided with purpose add sample methods
/*  for creating success/error responses & messages
/*
/* ################################################################### */

import { Response } from 'express';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import * as statusCodes from 'http-status';

// =====> Interfaces
import { IMsg } from '../interfaces';

// =====> Services
import { logger, isEmpty } from './';

/* ------------------------------------------------------------------- */
/*                            Response Msgs
/* ------------------------------------------------------------------- */

// =====> Custom msg
export const msg = (
  status: number = statusCodes.OK, data?: any, endPoint?: string, method?: string,
  requestFrom?: string, params?: { [x: string]: any }, text?: string
): IMsg => {
  // Specify statusText
  const statusText = text ? text : (statusCodes as any)[status];

  // Var for response
  const response: IMsg = { status, statusText };

  // If vars provided - include them
  if (requestFrom)
    response.requestFrom = requestFrom;
  if (method)
    response.method = method.toUpperCase();
  if (endPoint)
    response.endPoint = endPoint;
  if (params && !isEmpty(params))
    response.params = params;
  if (data && typeof data === 'object' && !isEmpty(data))
    response.data = data;
  if (data && typeof data !== 'object')
    response.data = data;

  // Return
  return response;
};

/* ------------------------------------------------------------------- */
/*                            Send Responses
/* ------------------------------------------------------------------- */

// =====> Custom response
export const send = (
  res: Response, status = statusCodes.OK, data: any, endPoint: string, method: string,
  requestFrom?: string, params?: { [x: string]: any }, text?: string
): Response => {
  // Create response
  const response = msg(status, data, endPoint, method, requestFrom, params, text);

  // Log
  if (status >= 400)
    logger.error(response);
  else
    logger.info(response);

  // Send response
  if (!res.headersSent) return res.status(status).send(response);
};
