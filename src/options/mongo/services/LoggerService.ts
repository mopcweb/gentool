/* ################################################################### */
/*
/*  This Service is provided with purpose to implement default logger
/*
/* ################################################################### */

/* tslint:disable */

const { createLogger, transports } = require('winston');
const { combine, simple, splat, printf } = require('winston').format;

/* tslint:enable */

import 'winston-mongodb';
import chalk from 'chalk';

/* ------------------------------------------------------------------- */
/*                                Config
/* ------------------------------------------------------------------- */

// =====> Config
import {
  LOG_LEVEL as level, LOG_SILENT as silent, MONGO, MONGO_DB_URI,
  VERSION, INSTANCE
} from '../utils/config';

// =====> Interfaces
import { ILogger } from '../interfaces';

/* ------------------------------------------------------------------- */
/*                  Custom format for winston logger
/* ------------------------------------------------------------------- */

const myFormat = printf((props: any) => {
  // Get necessary vars from props
  const { level, message, '0': zero, '1': first } = props;

  // Define vars for custom caption & color
  let caption: string;
  let color: string;

  // Specify caption & color
  if (first && typeof first === 'string')
    color = first;
  if (zero && typeof zero === 'string')
    caption = zero;
  else if (zero && typeof zero === 'object') {
    if (zero.caption)
      caption = zero.caption;
    if (zero.color)
      color = zero.color;
  }

  // Uppercase level and replcae if level === 'info' to 'success'
  const lvlUpperCase = level.indexOf('info') === -1
    ? level.toUpperCase()
    : 'SUCCESS'.toUpperCase();

  // Var for message caption
  const title =
    `[ >>>>> ${caption ? caption : lvlUpperCase} <<<<< ]`;

  // Define var for type of log
  let type: string;

  // Specify caption & its color for console
  if (color)
    try {
      type = (chalk as any)[color](title);
    } catch (err) { type = defineColor(level, title); }
  else
    type = defineColor(level, title);

  // Uncomment it to see default output
  // return `${level}: ${typeof message === 'object'
  //   ? JSON.stringify(message)
  //   : message}`;

  // Show in console & return 'empty'
  console.log(type + '\n', message);
  return ' ';
});

/* ------------------------------------------------------------------- */
/*                Helper -> define standart chalk color
/* ------------------------------------------------------------------- */

const defineColor = (level: string, title: string) => {
  // Define var for type of log
  let type: string;

  // Specify caption & its color for console
  if (level.indexOf('info') !== -1)
    type = chalk.green(title);
  else if (level.indexOf('warn') !== -1)
    type = chalk.yellow(title);
  else if (level.indexOf('error') !== -1)
    type = chalk.red(title);
  else if (level.indexOf('verbose') !== -1)
    type = chalk.cyan(title);
  else if (level.indexOf('debug') !== -1)
    type = chalk.hex('#9b69ff')(title);
  else
    type = chalk.yellow(title);

  // Return
  return type;
};

/* ------------------------------------------------------------------- */
/*                  Create winston logger instance
/* ------------------------------------------------------------------- */

// Create logger
const logger: ILogger = createLogger({
  level,
  silent,
  format: combine(
    splat(),
    simple(),
    myFormat
  ),
  name: 'logger',
  transports: [
    new transports.Console({
      handleExceptions: true,
      prettyPrint: JSON.stringify
    })
  ]
});

// Mongo connection options
const options: any = { ...MONGO.OPTIONS };
options.autoReconnect = true;
delete options.useFindAndModify;
delete options.useCreateIndex;

// Send logs into mongoDB
logger.add(new transports.MongoDB({
  db: MONGO_DB_URI,
  collection: MONGO.COLLECTIONS.LOGS,
  level: MONGO.LOG_LEVEL,
  capped: true,
  handleExceptions: true,
  tryReconnect: true,
  options,
  label: { INSTANCE, VERSION },
  storeHost: true
}));

/* ------------------------------------------------------------------- */
/*                               Export
/* ------------------------------------------------------------------- */

export {
  logger
};
