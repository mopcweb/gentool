/* ################################################################### */
/*
/*  This API is provided with purpose to provide API docs using Swagger
/*
/* ################################################################### */

import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import swaggerJSDoc = require('swagger-jsdoc');
import swaggerConfig from '../utils/swagger';

/**
 *   Swagger (API documentation) API
 */
const router = express.Router();

/* ------------------------------------------------------------------- */
/*                    Specify swagger JSDoc options
/* ------------------------------------------------------------------- */

const options: any = {
  swaggerDefinition: { ...swaggerConfig },
  apis: []
};

/* ------------------------------------------------------------------- */
/*                                GET
/* ------------------------------------------------------------------- */

router.get('*', swaggerUI.setup(swaggerJSDoc(options)));

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default router;
