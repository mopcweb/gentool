/* ################################################################### */
/*
/*  Helpers
/*
/* ################################################################### */

import * as path from 'path';
import * as fs from 'fs';

/* ------------------------------------------------------------------- */
/**
 *  Parse package.json
 */
/* ------------------------------------------------------------------- */

export const parsePackage = (letter = true) => {
  // Read file
  const file =
    fs.readFileSync(path.join(__dirname, '../..', 'package.json'), 'utf-8');

  // Parse JSON
  const parsed = JSON.parse(file);

  // Return
  return {
    title: capitalize(parsed.name),
    version: letter ? `v${parsed.version}` : parsed.version
  };
};

/* ------------------------------------------------------------------- */
/**
 *  Capitalize
 */
/* ------------------------------------------------------------------- */

export const capitalize = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

/* ------------------------------------------------------------------- */
/**
 *  Read dirs using path. Ignore '.' dirs
 */
/* ------------------------------------------------------------------- */

export const dirsArray = (dir: string) => {
  // Get all dirs
  const array = fs.readdirSync(dir);

  // Iterate over array and add item to the object
  // Ignore '.' notation names
  array.forEach((item, i) => {
    if (item[0] === '.')
      array.splice(i, 1);
  });

  // Return
  return array;
};

/* ------------------------------------------------------------------- */
/**
 *  Templates options
 */
/* ------------------------------------------------------------------- */

export const dirsObject = (dir: string) => {
  // Get all dirs
  const array = fs.readdirSync(dir);

  // Create options object
  const options: { [x: string]: any } = { };

  // Iterate over array and add item to the object
  // Ignore '.' notation names
  array.forEach(item => {
    if (item[0] !== '.')
      options[item] = `${dir}/${item}`;
  });

  // Return
  return options;
};

/* ------------------------------------------------------------------- */
/**
 *  Rename .npmignore to .gitignore, due to npm bug
 */
/* ------------------------------------------------------------------- */

export const rename = (dir: string, fileList: any[] = []) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory())
      fileList = rename(path.join(dir, file), fileList);
    else
      if (/.npmignore$/.test(file)) {
        const name = '.gitignore';
        const oldSrc = path.join(dir, file);
        const newSrc = path.join(dir, name);
        fs.renameSync(oldSrc, newSrc);
        fileList.push({ newSrc, oldSrc });
      }
  });

  return fileList;
};

/* ------------------------------------------------------------------- */
/**
 *  Finish project creation
 */
/* ------------------------------------------------------------------- */

export const finish = (dir: string) => {
  // Rename '.npmignore' -> '.gitignore'
  rename(dir);

  // Console
  console.log(
    'Project setted up. Please install necessary dependencies and run'
  );
};
