/* ################################################################### */
/*
/*  Tool config
/*
/* ################################################################### */

import * as path from 'path';

/* ------------------------------------------------------------------- */
/*                              Helpers
/* ------------------------------------------------------------------- */

import { dirsArray, parsePackage } from '../services/Helpers';

/* ------------------------------------------------------------------- */
/*                                Info
/* ------------------------------------------------------------------- */

export const { title, version } = parsePackage();

/* ------------------------------------------------------------------- */
/*                             Directories
/* ------------------------------------------------------------------- */

// =====> Current dir
export const dir = process.cwd();

// =====> Langs
export const langsDir = path.join(__dirname, '../templates');

// =====> Docker files
export const dockerDir = path.join(__dirname, '../docker');

// =====> Env dir
export const envDir = path.join(__dirname, '../env');

// =====> Shell scripts dir
export const scriptsDir = path.join(__dirname, '../scripts');

// =====> Options dir
export const optionsDirs = {
  redis: path.join(__dirname, '../options/redis')
};

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
// export const jsClientFrameworks =
//   dirsArray(`${templatesDir}/javascript/client`);

// =====> Angular templates
export const tsAngularTemplates =
  dirsArray(`${langsDir}/typescript/client/Angular`);

// =====> Angular templates
export const tsReactTemplates =
  dirsArray(`${langsDir}/typescript/client/React`);
// export const jsReactTemplates =
//   dirsArray(`${templatesDir}/javascript/client/React`);

// =====> Fullstack templates
export const tsFullstackTemplates =
  dirsArray(`${langsDir}/typescript/fullstack`);
// export const jsFullstackTemplates =
//   dirsArray(`${templatesDir}/javascript/fullstack`);

/* ------------------------------------------------------------------- */
/**
 *  Question Titles
 */
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

/* ------------------------------------------------------------------- */
/**
 *  Env.sh Readme
 */
/* ------------------------------------------------------------------- */

export const envShReadme =
  '## env.sh \n\n' +
  'This script parses env directory to use appropriate environment vars \n' +
  'Accepts 1 argument, which is instance title \n\n' +
  'Example: \n\n' +
  '\`\`\`bash \n' +
  '. ./env.sh stage \n' +
  '\`\`\` \n';

/* ------------------------------------------------------------------- */
/**
 *  Run.sh Readme
 */
/* ------------------------------------------------------------------- */

export const runShReadme =
  '## run.sh \n\n' +
  'This script parses launches docker-composes in project \n' +
  'Shares 2 methods: all -> launch all; logs -> shows logs \n\n' +
  'Example: \n\n' +
  '\`\`\`bash \n' +
  '. ./run.sh all \n' +
  '\`\`\` \n';
