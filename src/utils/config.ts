/* ################################################################### */
/*
/*  Tool config
/*
/* ################################################################### */

import * as path from 'path';

/* ------------------------------------------------------------------- */
/*                              Helpers
/* ------------------------------------------------------------------- */

import { dirsArray } from '../services';

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

// =====> Docker files
export const dockerDir = path.join(__dirname, '../docker');

/* ------------------------------------------------------------------- */
/*                           Directories lists
/* ------------------------------------------------------------------- */

// =====> Langs dirs' list
export const langs = dirsArray(langsDir);

// =====> Templates dirs' list
export const tsTemplates = dirsArray(`${langsDir}/typescript`);
// export const jsTemplates = dirsArray(`${langsDir}/javascript`);

// =====> Client templates
export const tsClientTemplates = dirsArray(`${langsDir}/typescript/client`);
// export const jsClientTemplates = dirsArray(`${templatesDir}/javascript/client`);

/* ------------------------------------------------------------------- */
/*                            Question Titles
/* ------------------------------------------------------------------- */

export const questionTitles = {
  choice: 'project-choice',
  clientType: 'project-clientType',
  db: 'project-db',
  docker: 'project-docker',
  framework: 'project-framework',
  lang: 'project-lang',
  material: 'project-material',
  redis: 'project-redis',
  router: 'project-router',
  root: 'project-root',
  title: 'project-title',
};
