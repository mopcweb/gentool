/* ################################################################### */
/*
/*  Common status codes for server responses
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                              Status Codes
/* ------------------------------------------------------------------- */

// =====> 200: OK
export const successCode: number = 200;

// =====> 201: Created
export const createdCode: number = 201;

// =====> 204: No Content
export const noContentCode: number = 204;

// =====> 400: Bad Request
export const badReqCode: number = 400;

// =====> 401: Unauthorized
export const unAuthorizedCode: number = 401;

// =====> 403: Forbidden
export const forbiddenCode: number = 403;

// =====> 404: Not Found
export const notFoundCode: number = 404;

// =====> 405: Method Not Allowed
export const notAllowedCode: number = 405;

// =====> 409: Conflict (Use for Already exist only)
export const conflictCode: number = 409;

// =====> 500: Internal Server Error
export const internalServerErrorCode: number = 500;

// =====> 501: Not Implemented
export const notImplementedCode: number = 501;

// =====> 502: Bad Gateway
export const badGatewayCode: number = 502;

// =====> 504: Gateway Timeout
export const gatewayTimeoutCode: number = 504;
