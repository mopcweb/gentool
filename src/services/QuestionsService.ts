/* ################################################################### */
/*
/*  Service which provides list of questions for inquirer
/*
/* ################################################################### */

import * as fs from 'fs';
import * as inquirer from 'inquirer';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

import { langs, templates, questionTitles, dir } from '../utils/config';

/* ------------------------------------------------------------------- */
/*                             Questions
/* ------------------------------------------------------------------- */

/* tslint:disable */

export const questions: inquirer.Questions = [
  {
    name: questionTitles.lang,
    type: 'list',
    message: 'What language would you like to use?',
    choices: langs
  },
  {
    name: questionTitles.root,
    type: 'list',
    message: 'Is that new root project or just a service (part of existing project)?',
    choices: ['Project', 'Service']
  },
  {
    name: questionTitles.choice,
    type: 'list',
    message: 'What project would you like to generate?',
    choices: templates
  },
  {
    name: questionTitles.title,
    type: 'input',
    message: 'Project name:',
    validate: (input: string) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input))
        return fs.existsSync(`${dir}/${input}`)
          ? 'There is already a directory with such name. Please, choose another project title.'
          : true;
      else
        return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: questionTitles.redis,
    type: 'list',
    message: 'Add RedisDB for cache?',
    choices: ['Yes', 'No']
  },
  {
    name: questionTitles.db,
    type: 'list',
    message: 'What database are you going to use?',
    choices: ['MongoDB', 'None']
  },
  {
    name: questionTitles.docker,
    type: 'list',
    message: 'Add Docker & Docker-compose?',
    choices: ['Yes', 'No']
  }
];
