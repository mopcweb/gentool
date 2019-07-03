/* ################################################################### */
/*
/*  Service which provides list of questions for inquirer
/*
/* ################################################################### */

import * as inquirer from 'inquirer';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

import { langs, templates, questionTitles } from '../utils/config';

/* ------------------------------------------------------------------- */
/*                             Questions
/* ------------------------------------------------------------------- */

export const questions: inquirer.Questions = [
  {
    name: questionTitles.lang,
    type: 'list',
    message: 'What language would you like to use?',
    choices: langs
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
        return true;
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
