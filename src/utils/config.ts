/* ################################################################### */
/*
/*  Tool config
/*
/* ################################################################### */

import * as fs from 'fs';
import * as path from 'path';

/* ------------------------------------------------------------------- */
/*                                Info
/* ------------------------------------------------------------------- */

export const title = 'Gentool';
export const version = 'v1.0.0';

/* ------------------------------------------------------------------- */
/*                             Directories
/* ------------------------------------------------------------------- */

// =====> Current dir
export const dir = process.cwd();

// =====> Langs
export const langsDir = path.join(__dirname, '../templates');

// =====> Templates
export const templatesDir = path.join(__dirname, '../templates/typescript');

// =====> Docker files
export const dockerDir = path.join(__dirname, '../docker');

/* ------------------------------------------------------------------- */
/*                           Directories lists
/* ------------------------------------------------------------------- */

// =====> Langs dirs
export const langs = fs.readdirSync(langsDir);

// =====> Templates dirs
export const templates = fs.readdirSync(templatesDir);

/* ------------------------------------------------------------------- */
/*                            Question Titles
/* ------------------------------------------------------------------- */

export const questionTitles = {
  lang: 'project-lang',
  choice: 'project-choice',
  title: 'project-title',
  redis: 'project-redis',
  db: 'project-db',
  docker: 'project-docker'
};

/* ------------------------------------------------------------------- */
/*                           Templates options
/* ------------------------------------------------------------------- */

export const templateOptions = (dir: string) => {
  // Get all dirs
  const array = fs.readdirSync(dir);

  // Create options object
  const options: { [x: string]: any } = { };

  // Iterate over array and add item to the object
  array.forEach(item => options[item] = `${dir}/${item}`);

  // Return
  return options;
};

// export const templateOptions = {
//   basic: '/basic',
//   redis: '/redis',
//   mongo: '/mongo',
//   redis_mongo: '/redis_mongo',
// };
