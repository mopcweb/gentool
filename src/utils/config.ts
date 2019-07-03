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
export const version = 'v0.1.0';

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
  choice: 'project-choice',
  db: 'project-db',
  docker: 'project-docker',
  lang: 'project-lang',
  redis: 'project-redis',
  root: 'project-root',
  title: 'project-title',
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
