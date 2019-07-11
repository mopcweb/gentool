/* ################################################################### */
/*
/*  Constants, used for responses, logging, etc...
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                             Launch Msg
/* ------------------------------------------------------------------- */

export const launchMsg = `
=========================================================================
|                                                                       |
|                                                                       |
|                     WELCOME TO WIDGET API SERVER                      |
|                                                                       |
|                                                                       |
=========================================================================
`;

/* ------------------------------------------------------------------- */
/*                         Health check Msg
/* ------------------------------------------------------------------- */

export const healthCheckMsg = 'Health checking ... Successfull.';

/* ------------------------------------------------------------------- */
/*                            Error Msg
/* ------------------------------------------------------------------- */

export const errorMsg = 'No such api provided with middleware';

/* ------------------------------------------------------------------- */
/*                             Auth Msg
/* ------------------------------------------------------------------- */

export const authMsg = 'Invalid token provided';
export const noTokenMsg = 'Invalid request: token should be provided';
export const noParamsMsg =
  'Params: clientId, clientSecret, client, app, instance should be provided';

/* ------------------------------------------------------------------- */
/*                             AWS Msgs
/* ------------------------------------------------------------------- */

export const awsConnectionErrorMsg =
  'Error requesting AWS. Please, try again';

/* ------------------------------------------------------------------- */
/*                         OI Middleware Msgs
/* ------------------------------------------------------------------- */

export const oiConnectionErrorMsg =
  'Error requesting OI Middleware Server. Please, try again';
