/* ################################################################### */
/*
/*  This Service is provided with purpose add sample methods
/*  for creating success/error responses & messages
/*
/* ################################################################### */

import { Request, Response } from 'express';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import * as statusCodes from 'http-status';

// =====> Interfaces
import { IMsg } from '../interfaces';

// =====> Services
import { logger, isEmpty, removeParams } from './';

/* ------------------------------------------------------------------- */
/**
 *  Creates basic msg with default status (200) and statusText (Ok)
 */
/* ------------------------------------------------------------------- */

export const msg = (
  status: number = statusCodes.OK, data?: any, endPoint?: string,
  method?: string, requestFrom?: string, params?: { [x: string]: any },
  text?: string
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

  if (data === false || data === 0 || data === '')
    response.data = data;
  else if (!data)
    response.data = (statusCodes as any)[status];
  else if (data && typeof data === 'object' && !isEmpty(data))
    response.data = data;
  else if (data && typeof data !== 'object')
    response.data = data;

  // Return
  return response;
};

/* ------------------------------------------------------------------- */
/**
 *  Holds common msg methods
 */
/* ------------------------------------------------------------------- */

export const notify = {
  /**
   *  Alias for msg with custom status, data, etc...
   */
  msg,

  /**
   *  Alias for msg with OK (200) status
   */
  ok: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(statusCodes.OK, data, endPoint, method, requestFrom, params, text),

  /**
   *  Alias for msg with CREATED (201) status
   */
  created: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(statusCodes.CREATED, data, endPoint, method, requestFrom, params, text),

  /**
   *  Alias for msg with BAD_REQUEST (400) status
   */
  badRequest: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.BAD_REQUEST, data, endPoint, method,
      requestFrom, params, text
    ),

  /**
   *  Alias for msg with UNAUTHORIZED (401) status
   */
  unAuthorized: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.UNAUTHORIZED, data, endPoint, method,
      requestFrom, params, text
    ),

  /**
   *  Alias for msg with FORBIDDEN (403) status
   */
  forbidden: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.FORBIDDEN, data, endPoint, method,
      requestFrom, params, text
    ),

  /**
   *  Alias for msg with CONFLICT (409) status
   */
  conflict: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.CONFLICT, data, endPoint, method,
      requestFrom, params, text
    ),

  /**
   *  Alias for msg with NOT_FOUND (404) status
   */
  notFound: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.NOT_FOUND, data, endPoint, method,
      requestFrom, params, text
    ),

  /**
   *  Alias for msg with METHOD_NOT_ALLOWED (405) status
   */
  notAllowed: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.METHOD_NOT_ALLOWED, data, endPoint, method,
      requestFrom, params, text
    ),

  /**
   *  Alias for msg with NOT_IMPLEMENTED (501) status
   */
  notImplemented: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.NOT_IMPLEMENTED, data, endPoint, method,
      requestFrom, params, text
    ),

  /**
   *  Alias for msg with BAD_GATEWAY (502) status
   */
  badGateway: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.BAD_GATEWAY, data, endPoint, method,
      requestFrom, params, text
    ),

  /**
   *  Alias for msg with GATEWAY_TIMEOUT (504) status
   */
  gatewayTimeout: (
    data?: any, endPoint?: string,
    method?: string, requestFrom?: string, params?: { [x: string]: any },
    text?: string
  ) =>
    msg(
      statusCodes.GATEWAY_TIMEOUT, data, endPoint, method,
      requestFrom, params, text
    ),
};

/* ------------------------------------------------------------------- */
/**
 *  Creates basic server response with default status (200) and statusText (Ok)
 */
/* ------------------------------------------------------------------- */

export const respond = (
  req: Request, res: Response, data?: any, status = statusCodes.OK,
  text?: string, exclude?: string[]
): Response => {
  // Get necessary data from request
  const { originalUrl, method, headers, query } = req;
  const { referer } = headers;

  // Response url
  const responseUrl = removeParams(originalUrl);

  // If there is 'clientId' in query -> remove it
  if (query && query.clientId)
    delete query.clientId;

  // Create response
  const response =
    (data && typeof data === 'object' && data.status && data.statusText)
      ? msg(data.status, data.data, responseUrl, method, referer, query, text)
      : msg(status, data, responseUrl, method, referer, query, text);

  // Status for logger check
  const checkStatus = data && data.status
    ? data.status
    : status;

  // Log
  if (checkStatus >= 400)
    logger.error(response);
  else
    logger.info(response);

  // Send response
  if (!res.headersSent) return res.status(checkStatus).send(response);
};

/* ------------------------------------------------------------------- */
/**
 *  Holds basic server response methods
 */
/* ------------------------------------------------------------------- */

export const reply = {
  /**
   *  Alias for response with custom status, data, etc...
   */
  msg: respond,

  /**
   *  Alias for response with OK (200) status
   */
  ok: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.OK),

  /**
   *  Alias for response with CREATED (201) status
   */
  created: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.CREATED),

  /**
   *  Alias for response with BAD_REQUEST (400) status
   */
  badRequest: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.BAD_REQUEST),

  /**
   *  Alias for response with UNAUTHORIZED (401) status
   */
  unAuthorized: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.UNAUTHORIZED),

  /**
   *  Alias for response with FORBIDDEN (403) status
   */
  forbidden: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.FORBIDDEN),

  /**
   *  Alias for response with CONFLICT (409) status
   */
  conflict: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.CONFLICT),

  /**
   *  Alias for response with NOT_FOUND (404) status
   */
  notFound: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.NOT_FOUND),

  /**
   *  Alias for response with METHOD_NOT_ALLOWED (405) status
   */
  notAllowed: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.METHOD_NOT_ALLOWED),

  /**
   *  Alias for response with NOT_IMPLEMENTED (501) status
   */
  notImplemented: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.NOT_IMPLEMENTED),

  /**
   *  Alias for response with BAD_GATEWAY (502) status
   */
  badGateway: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.BAD_GATEWAY),

  /**
   *  Alias for response with GATEWAY_TIMEOUT (504) status
   */
  gatewayTimeout: (req: Request, res: Response, data?: any) =>
    respond(req, res, data, statusCodes.GATEWAY_TIMEOUT),
};
