/* ################################################################### */
/*
/*  Common status codes for server responses
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                              Status Codes
/* ------------------------------------------------------------------- */

// =====> 200: OK
export const successCode = 200;

// =====> 201: Created
export const createdCode = 201;

// =====> 204: No Content
export const noContentCode = 204;

// =====> 400: Bad Request
export const badReqCode = 400;

// =====> 401: Unauthorized
export const unAuthorizedCode = 401;

// =====> 403: Forbidden
export const forbiddenCode = 403;

// =====> 404: Not Found
export const notFoundCode = 404;

// =====> 405: Method Not Allowed
export const notAllowedCode = 405;

// =====> 409: Conflict (Use for Already exist only)
export const conflictCode = 409;

// =====> 500: Internal Server Error
export const internalServerErrorCode = 500;

// =====> 501: Not Implemented
export const notImplementedCode = 501;

// =====> 502: Bad Gateway
export const badGatewayCode = 502;

// =====> 504: Gateway Timeout
export const gatewayTimeoutCode = 504;
