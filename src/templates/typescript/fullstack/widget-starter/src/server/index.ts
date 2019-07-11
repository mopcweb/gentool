/* ################################################################### */
/*
/*  Server core
/*
/* ################################################################### */

import * as express from 'express';
import * as path from 'path';

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
/*                          Show API Docs
/* ------------------------------------------------------------------- */

showAPIDocs(routes, 'Widget Server', 'cyan');

/* ------------------------------------------------------------------- */
/*                            Use router
/* ------------------------------------------------------------------- */

app.use('/', router);

/* ------------------------------------------------------------------- */
/*                              Static
/* ------------------------------------------------------------------- */

// app.use(express.static(path.join(__dirname, '../client/dist/client')))
//
// app.get('*', (req, res) => {
//   // console.log('======> REQ ', req.query);
//   res.sendFile(path.join(__dirname, '../client/dist/client', 'index.html'))
// })

/* ------------------------------------------------------------------- */
/*                              Listen
/* ------------------------------------------------------------------- */

app.listen(port, () => logger.verbose(
  `🌎  WIDGET server is running on localhost:${port}`,
  ['WIDGET SERVER STARTED']
));
