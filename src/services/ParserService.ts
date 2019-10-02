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
 *  Copies file(s)
 *
 *  @param oldPath - Old file(s) path(s)
 *  @param newPath - New file(s) path(s)
 */
/* ------------------------------------------------------------------- */

export const copy = async (oldPath: string, newPath: string) =>
  ncpAsync(oldPath, newPath)
    .catch(err =>
      console.log(
        `Error copying from: ${oldPath}, to: ${newPath}. Please try again \n`,
        err
      ));

/* ------------------------------------------------------------------- */
/**
 *  Checks if dir / file exists
 *
 *  @param path - Dir / file path
 */
/* ------------------------------------------------------------------- */

export const isExists = (path: string) => {
  return fs.existsSync(path);
};

/* ------------------------------------------------------------------- */
/**
 *  Reads file and returns its content
 *
 *  @param path - File path
 */
/* ------------------------------------------------------------------- */

export const read = (path: string) => {
  return fs.readFileSync(path, 'utf-8');
};

/* ------------------------------------------------------------------- */
/**
 *  Gets file substring
 *
 *  @param path - Dir / file path
 *  @param substr - Substring to get
 *  @param [file] - File, in order not to read manually
 */
/* ------------------------------------------------------------------- */

export const getSubstring = (
  path: string, substr: string | RegExp, file?: any
) => {
  if (!isExists(path))
    return { };

  if (!file)
    file = read(path);

  // Vars
  let start: number;
  let length: number;
  let end: number;

  // Find as RegExp and as string
  const match = file.match(substr);
  const indexOf = file.indexOf(substr as string);

  // If as RegExp found
  if (match && match[0] && match.index !== -1) {
    start = match.index;
    length = match[0].length;
    end = start + length;
  }

  // Else if as string found
  else if (indexOf !== -1 && typeof substr === 'string') {
    start = indexOf;
    length = substr.length;
    end = start + length;
  }

  return start !== undefined && length !== undefined && end !== undefined
    ? { start, length, end }
    : { };
};

/* ------------------------------------------------------------------- */
/**
 *  Inserts data into file
 *
 *  @param path - File path
 *  @param data - Data to insert
 *  @param [substr] - String | RegExp, by which to get substring to define
 *  insert position
 *  @param [mode='a'] - Defines mode: after substr, before or replace
 *  @param [returnFile=false] - Whether to return updated file
 */
/* ------------------------------------------------------------------- */

export const insert = (
  path: string, data: any, substr?: string | RegExp,
  mode: 'a' | 'b' | 'r' = 'a', returnFile = false
) => {
  // Read file
  const file = read(path);

  if (!file)
    return;

  // Get position to insert (to the end of file by default)
  let index = file.length;

  if (mode === 'a' || mode === 'b') {
    const { start, end } = getSubstring(path, substr, file);

    if (mode === 'a' && end)
      index = end;
    else if (mode === 'b' && start)
      index = start;

    // Get file text, which would be overwriten by new
    const substring = file.substring(index);

    // Data to insert
    const text = Buffer.from(data + substring);

    // Open file to get its file descriptor (fd)
    const fd = fs.openSync(path, 'r+');

    // Write & close
    fs.writeSync(fd, text, 0, text.length, index);
    fs.closeSync(fd);
  }
  else if (mode === 'r') {
    const replaced = file.replace(substr, data);

    fs.writeFileSync(path, replaced, 'utf-8');
  }
  else
    return;

  if (returnFile)
    return read(path);
};
