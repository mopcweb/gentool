/* ################################################################### */
/*
/*  Service which put questions into console and creates project
/*
/* ################################################################### */

import { promisify } from 'util';
import * as inquirer from 'inquirer';
import { ncp } from 'ncp';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// Make ncp an async function
const ncpAsync = promisify(ncp);

// =====> Config
import {
  dir, questionTitles, langsDir, dockerDir
} from '../utils/config';

// =====> Services
import { questions, dirsObject as options } from './';

/* ------------------------------------------------------------------- */
/*                            Ask in console
/* ------------------------------------------------------------------- */

export const prompt = () => inquirer.prompt(questions)
  .then(answers => {
    createServer(answers);
    createClient(answers);
    createFullstack(answers);
  });

/* ------------------------------------------------------------------- */
/*                            Create client
/* ------------------------------------------------------------------- */

const createClient = (answers: inquirer.Answers) => {
  // Get answers
  const lang = answers[questionTitles.lang];
  const root = answers[questionTitles.root];
  const choice = answers[questionTitles.choice];
  const title = answers[questionTitles.title];
  const framework = answers[questionTitles.framework];
  const clientTemplate = answers[questionTitles.clientTemplate];
  // const clientType = answers[questionTitles.clientType];
  // const router = answers[questionTitles.router];
  // const material = answers[questionTitles.material];

  // Stop if choice !== 'client'
  if (choice !== 'client')
    return;

  // For now if New type -> stop
  // if (clientType !== 'Template')
  //   return;

  // Choose basic template
  const template = root === 'Project'
    ? `${langsDir}/${lang}/${choice}/${framework}/${clientTemplate}`
    : `${langsDir}/${lang}/${choice}/${framework}/${clientTemplate}/src`;

  // Create new project path
  const project = `${dir}/${title}`;

  // Copy template
  copy(template, project);
};

/* ------------------------------------------------------------------- */
/*                            Create server
/* ------------------------------------------------------------------- */

const createServer = async (answers: inquirer.Answers) => {
  // Get answers
  const lang = answers[questionTitles.lang];
  const root = answers[questionTitles.root];
  const choice = answers[questionTitles.choice];
  const title = answers[questionTitles.title];
  const redis = answers[questionTitles.redis];
  const db = answers[questionTitles.db];
  const docker = answers[questionTitles.docker];

  // Stop if choice !== 'server'
  if (choice !== 'server')
    return;

  // Choose basic template
  const template = root === 'Project'
    ? addDbs(`${langsDir}/${lang}/${choice}`, redis, db)
    : addDbs(`${langsDir}/${lang}/${choice}`, redis, db) + '/src';

  // Create new project path
  const project = `${dir}/${title}`;

  // Copy template
  await copy(template, project);

  // Add docker
  if (docker === 'Yes')
    root === 'Project'
      ? addDocker(project + '/src', redis, db)
      : addDocker(project, redis, db);
};

/* ------------------------------------------------------------------- */
/*                            Create client
/* ------------------------------------------------------------------- */

const createFullstack = (answers: inquirer.Answers) => {
  // Get answers
  const lang = answers[questionTitles.lang];
  const root = answers[questionTitles.root];
  const choice = answers[questionTitles.choice];
  const title = answers[questionTitles.title];
  const fullstackTemplate = answers[questionTitles.fullstackTemplate];

  // Stop if choice !== 'client'
  if (choice !== 'fullstack')
    return;

  // Choose basic template
  const template = root === 'Project'
    ? `${langsDir}/${lang}/${choice}/${fullstackTemplate}`
    : `${langsDir}/${lang}/${choice}/${fullstackTemplate}/src`;

  // Create new project path
  const project = `${dir}/${title}`;

  // Copy template
  copy(template, project);
};

/* ------------------------------------------------------------------- */
/*                            Copy template
/* ------------------------------------------------------------------- */

const copy = async (oldPath: string, newPath: string) =>
  ncpAsync(oldPath, newPath)
    .then(() =>
      console.log('Project setted up. Please install necessary dependencies and run'))
    .catch(err => console.log('Error copying new project. Please try again', err));

/* ------------------------------------------------------------------- */
/*                          Add Redis / MongoDB
/* ------------------------------------------------------------------- */

const addDbs = (path: string, redis: string, db: string) => {
  // Choose basic template
  let template = options(path).basic;

  // Choose redis template
  if (redis === 'Yes' && db === 'None')
    template = options(path).redis;

  // Choose mongo template
  if (db === 'MongoDB' && redis === 'No')
    template = options(path).mongo;

  // Choose redis + mongo template
  if (redis === 'Yes' && db === 'MongoDB')
    template = options(path).redis_mongo;

  // Return
  return template;
};

/* ------------------------------------------------------------------- */
/*                              Add Docker
/* ------------------------------------------------------------------- */

const addDocker = (path: string, redis: string, db: string) => {
  // Basic docker option
  let dockerOption = options(dockerDir).basic;

  // Define docker option
  if (redis === 'Yes' && db === 'None')
    dockerOption = options(dockerDir).redis;
  if (db === 'MongoDB' && redis === 'No')
    dockerOption = options(dockerDir).mongo;
  if (redis === 'Yes' && db === 'MongoDB')
    dockerOption = options(dockerDir).redis_mongo;

  // Copy docker files
  ncpAsync(dockerOption, path)
    .catch(err => console.log('Error copying docker files. Please try again', err));
};
