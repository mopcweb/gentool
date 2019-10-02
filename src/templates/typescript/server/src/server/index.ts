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
import { PORT } from './utils/config';

// =====> Routes
import { routes } from './utils/routes';

// =====> Constants
import { launchMsg } from './utils/constants';

// =====> Router
import router from './routes';

// =====> Services
import { logger, showAPIDocs } from './services';

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

app.listen(PORT, () => logger.verbose(
  `🌎  BASIC SERVER is running on localhost:${PORT}`,
  ['BASIC SERVER STARTED']
));
