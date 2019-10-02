/* ################################################################### */
/*
/*  Service which clears console & provides tool name
/*
/* ################################################################### */

/* tslint:disable */

import chalk from 'chalk';
import * as figlet from 'figlet';
const clear = require('clear');

/* tslint:enable */

/* ------------------------------------------------------------------- */
/*                                Config
/* ------------------------------------------------------------------- */

import { title, version } from '../utils/config';

/* ------------------------------------------------------------------- */
/**
 *  Clears console & shows package title + version
 */
/* ------------------------------------------------------------------- */

export const start = () => {
  clear();

  console.log(
    chalk.yellow(figlet.textSync(
      `${title} ${version}`, { horizontalLayout: 'full' })
    )
  );
};
