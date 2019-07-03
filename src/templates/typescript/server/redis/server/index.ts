/* ################################################################### */
/*
/*  Server core
/*
/* ################################################################### */

import * as express from 'express';

// =====> Get App instance
const app = express();

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> Config
import { port } from './utils/config';

// =====> Routes
import { routes } from './utils/routes';

// =====> Router
import router from './routes';

// =====> Services
import { logger, showAPIDocs } from './services';

// =====> Constants
import { launchMsg } from './utils/constants';

/* ------------------------------------------------------------------- */
/*                          Show greetings
/* ------------------------------------------------------------------- */

console.log(launchMsg);

/* ------------------------------------------------------------------- */
/*                           Show API Docs
/* ------------------------------------------------------------------- */

showAPIDocs(routes, 'BASIC SERVER API reference', 'cyan');

/* ------------------------------------------------------------------- */
/*                            Use router
/* ------------------------------------------------------------------- */

app.use('/', router);

/* ------------------------------------------------------------------- */
/*                              Listen
/* ------------------------------------------------------------------- */

app.listen(port, () => logger.verbose(
  `🌎  BASIC SERVER is running on localhost:${port}`,
  ['BASIC SERVER STARTED']
));
