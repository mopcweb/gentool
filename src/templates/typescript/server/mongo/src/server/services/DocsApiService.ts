/* ################################################################### */
/*
/*  This Service is provided with purpose to show in console
/*  API reference and docs
/*
/* ################################################################### */

import chalk from 'chalk';
import * as Table from 'cli-table3';

/* ------------------------------------------------------------------- */
/*                              API Table
/* ------------------------------------------------------------------- */

// =====> Show in console/terminal API table
export const showAPIDocs = (routes: any, title?: string, color?: string) => {

  // Define title and color for title
  const name: string = title
    ? (chalk as any)[color ? color : 'green'](title)
    : '';

  // Caption for table
  const caption: string = title
    ? chalk.yellow(`\n #### API reference: ${name} ####`)
    : '';

  // Create table, table header & border styles
  /* tslint:disable */

  const table: any = new Table({
    style: { head: ['reset'] },
    head: ['', 'METHOD', 'API Endpoint', 'Source File'],
    chars: {
      'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗',
      'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝',
      'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼',
      'right': '║' , 'right-mid': '╢' , 'middle': '│'
    }
  });

  /* tslint:enable */

  // Push data into table
  for (const key in routes) table.push([
    key,
    colorizeString(routes[key].method),
    chalk.yellow(routes[key].endPoint),
    chalk.green('routes/' + key.toLowerCase() + '.ts')
  ]);

  // Console.log table
  console.log(caption + '\n' + table.toString() + '\n');
};

/* ------------------------------------------------------------------- */
/*                       Colorize output string
/* ------------------------------------------------------------------- */

const colorizeString = (str: string) => {
  let output = '';

  if (str.indexOf('POST') !== -1) output += chalk.yellow('POST');
  if (str.indexOf('GET') !== -1)
    output ? output += `, ${chalk.green('GET')}` : output += chalk.green('GET');
  if (str.indexOf('PUT') !== -1)
    output ? output += `, ${chalk.cyan('PUT')}` : output += chalk.cyan('PUT');
  if (str.indexOf('DELETE') !== -1)
    output ? output += `, ${chalk.red('DELETE')}` : output += chalk.red('DELETE');
  if (str.indexOf('PATCH') !== -1)
    output ? output += `, ${chalk.grey('PATCH')}` : output += chalk.cyan('PATCH');

  return output;
};
