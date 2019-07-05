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
export const tsClientFrameworks = dirsArray(`${langsDir}/typescript/client`);
// export const jsClientFrameworks = dirsArray(`${templatesDir}/javascript/client`);

// =====> Angular templates
export const tsAngularTemplates = dirsArray(`${langsDir}/typescript/client/Angular`);

// =====> Angular templates
export const tsReactTemplates = dirsArray(`${langsDir}/typescript/client/React`);
// export const jsReactTemplates = dirsArray(`${templatesDir}/javascript/client/React`);

/* ------------------------------------------------------------------- */
/*                            Question Titles
/* ------------------------------------------------------------------- */

export const questionTitles = {
  choice: 'project-choice',
  clientType: 'project-clientType',
  clientTemplate: 'project-clientTemplate',
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
