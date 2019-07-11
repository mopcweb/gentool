/* ################################################################### */
/*
/*  Helpers
/*
/* ################################################################### */

import * as fs from 'fs';

/* ------------------------------------------------------------------- */
/*                 Read dirs using path. Ignore '.' dirs
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
/*                           Templates options
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
