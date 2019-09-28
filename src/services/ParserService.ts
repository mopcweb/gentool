/* ################################################################### */
/*
/*  Service for parsing project files and adds necessary options
/*
/* ################################################################### */

import * as fs from 'fs';
import { promisify } from 'util';
import { ncp } from 'ncp';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// ====> Make ncp an async function
const ncpAsync = promisify(ncp);

// ====> Config
// import { dir } from '../utils/config';

/* ------------------------------------------------------------------- */
/**
 *  Copy file / files
 *
 *  @param oldPath - Old file / files path
 *  @param newPath - New file / files path
 */
/* ------------------------------------------------------------------- */

export const copy = async (oldPath: string, newPath: string) =>
  ncpAsync(oldPath, newPath)
    .catch(err =>
        console.log('Error copying new project. Please try again', err));

/* ------------------------------------------------------------------- */
/**
 *  Reads file and returns its content
 *
 *  @param path - File path, relatively to dir path
 */
/* ------------------------------------------------------------------- */

export const read = (path: string) => {
  return fs.readFileSync(path, 'utf-8');
};

/* ------------------------------------------------------------------- */
/**
 *  Inserts data into file
 *
 *  @param path - File path, relatively to dir path
 *  @param data - Data to insert
 *  @param [after] - String, after which to insert
 *  @param [before] - String, before which to insert
 */
/* ------------------------------------------------------------------- */

export const insert = (
  path: string, data: any, after?: string | RegExp, before?: string | RegExp,
  removeNewLine = false
) => {
  // Read file
  const readed = fs.readFileSync(path, 'utf-8');

  // Get position to insert: after provided string or to the end by default
  let index = readed.length;
  let dataWithOffset: any = '\n' + data;

  if (after) {
    // Find as RegExp and as string
    const match = readed.match(after);
    const indexOf = readed.indexOf(after as string);

    // If as RegExp found
    if (match && match[0] && match.index !== -1)
      removeNewLine
        ? index = match.index + match[0].length + 1
        : index = match.index + match[0].length;

    // Else if as string found
    else if (indexOf !== -1 && typeof after === 'string')
      removeNewLine
        ? index = indexOf + after.length + 1
        : index = indexOf + after.length;
  }
  else if (before) {
    // Find as RegExp and as string
    const match = readed.match(before);
    const indexOf = readed.indexOf(before as string);

    // If as RegExp found
    if (match && match[0] && match.index !== -1) {
      removeNewLine
        ? index = match.index - 1
        : index = match.index;
      dataWithOffset = data + '\n';
    }

    // Else if as string found
    else if (indexOf !== -1 && typeof before === 'string') {
      removeNewLine
        ? index = indexOf - 1
        : index = indexOf;
      dataWithOffset = data + '\n';
    }
  }

  // Get file text, which would be overwriten by new
  const substring = readed.substring(index);

  // Data to insert
  const text = Buffer.from(dataWithOffset + substring);

  // Open file to get its file descriptor (fd)
  const file = fs.openSync(path, 'r+');

  // Write
  fs.writeSync(file, text, 0, text.length, index);

  // Close
  fs.closeSync(file);
};
