/* ################################################################### */
/*
/*  Service which puts questions into console and creates project
/*
/* ################################################################### */

import * as inquirer from 'inquirer';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Config
import {
  dir, questionTitles, langsDir, envShReadme, runShReadme, optionsDir
} from '../utils/config';

// =====> Services
import {
  questions, finish, addRedis, addMongo, copy, insert, isExists
} from './';

/* ------------------------------------------------------------------- */
/**
 *  Enables quiz in console
 */
/* ------------------------------------------------------------------- */

export const prompt = () => inquirer.prompt(questions)
  .then(async answers => {
    await createServer(answers);
    await createClient(answers);
    await createFullstack(answers);
  });

/* ------------------------------------------------------------------- */
/**
 *  Creates client project from template
 *
 *  @param answers - Quiz answers
 */
/* ------------------------------------------------------------------- */

const createClient = async (answers: inquirer.Answers) => {
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
  await copy(template, project);

  finish(project);
};

/* ------------------------------------------------------------------- */
/**
 *  Creates basic server and adds chosen options
 *
 *  @param answers - Quiz answers
 */
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

  // Choose basic server path
  const template = root === 'Project'
    ? `${langsDir}/${lang}/${choice}`
    : `${langsDir}/${lang}/${choice}/src`;

  // Create new project path
  const project = `${dir}/${title}`;

  // Copy template
  await copy(template, project);

  if (docker === 'Yes')
    await addDocker(project);

  if (redis === 'Yes')
    await addRedis(project);

  if (db === 'MongoDB')
    await addMongo(project);

  if (root === 'Project')
    await addScripts(project, docker);

  finish(project);
};

/* ------------------------------------------------------------------- */
/**
 *  Creates fullstack project from template
 *
 *  @param answers - Quiz answers
 */
/* ------------------------------------------------------------------- */

const createFullstack = async (answers: inquirer.Answers) => {
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
  await copy(template, project);

  finish(project);
};

/* ------------------------------------------------------------------- */
/**
 *  Adds Docker
 *
 *  @param path - Project path
 */
/* ------------------------------------------------------------------- */

const addDocker = async (path: string) => {
  const destination = isExists(path + '/src') ? path + '/src' : path;

  await copy(optionsDir.docker, destination);
};

/* ------------------------------------------------------------------- */
/**
 *  Adds bash scripts
 *
 *  @param path - Project path
 *  @param docker - Docker option
 */
/* ------------------------------------------------------------------- */

const addScripts = async (path: string, docker: string) => {
  await copy(optionsDir.env, `${path}/env`);
  await copy(`${optionsDir.scripts}/env.sh`, `${path}/env.sh`);
  insert(`${path}/Readme.md`, envShReadme);

  // If docker -> add run.sh
  if (docker === 'Yes') {
    await copy(`${optionsDir.scripts}/run.sh`, `${path}/run.sh`);
    insert(`${path}/Readme.md`, runShReadme);
  }
};
