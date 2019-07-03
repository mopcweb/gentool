/* ################################################################### */
/*
/*  Service which clears console & provides tool name
/*
/* ################################################################### */

/* tslint:disable */

import chalk from 'chalk';
import * as figlet from 'figlet';
const clear  = require('clear');

/* tslint:enable */

/* ------------------------------------------------------------------- */
/*                                Config
/* ------------------------------------------------------------------- */

import { title, version } from '../utils/config';

/* ------------------------------------------------------------------- */
/*                                Start
/* ------------------------------------------------------------------- */

export const start = () => {
  // Clear console
  clear();

  // Console log tool title
  console.log(
    chalk.yellow(figlet.textSync(
      `${title} ${version}`, { horizontalLayout: 'full' })
    )
  );
};
