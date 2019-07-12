/* ################################################################### */
/*
/*  Tool config
/*
/* ################################################################### */

import * as path from 'path';
/* tslint:disable */
const pack = require('../../package.json');
/* tslint:enable */

/* ------------------------------------------------------------------- */
/*                              Helpers
/* ------------------------------------------------------------------- */

import { dirsArray, capitalize } from '../services';

/* ------------------------------------------------------------------- */
/*                                Info
/* ------------------------------------------------------------------- */

export const title = capitalize(pack.name);
export const version = `v${pack.version}`;

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

// =====> Fullstack templates
export const tsFullstackTemplates = dirsArray(`${langsDir}/typescript/fullstack`);
// export const jsFullstackTemplates = dirsArray(`${templatesDir}/javascript/fullstack`);

/* ------------------------------------------------------------------- */
/*                            Question Titles
/* ------------------------------------------------------------------- */

export const questionTitles = {
  choice: 'project-choice',
  clientTemplate: 'project-clientTemplate',
  clientType: 'project-clientType',
  db: 'project-db',
  docker: 'project-docker',
  framework: 'project-framework',
  fullstackTemplate: 'project-fullstackTemplate',
  lang: 'project-lang',
  material: 'project-material',
  redis: 'project-redis',
  root: 'project-root',
  router: 'project-router',
  title: 'project-title',
};
