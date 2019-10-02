/* ################################################################### */
/*
/*  Service which provides list of questions for inquirer
/*
/* ################################################################### */

import * as fs from 'fs';
import { Questions } from 'inquirer';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import {
  langs, tsTemplates, questionTitles, dir, tsClientFrameworks,
  tsReactTemplates, tsAngularTemplates, tsFullstackTemplates
} from '../utils/config';

/* ------------------------------------------------------------------- */
/*                             Questions
/* ------------------------------------------------------------------- */

/* tslint:disable */

export const questions: Questions = [

  /* ********************** GENERAL QUESTIONS  ********************** */

  {
    name: questionTitles.title,
    type: 'input',
    message: 'Project name:',
    validate: input => {
      if (/^([A-Za-z\-\_\d])+$/.test(input))
        return fs.existsSync(`${dir}/${input}`)
          ? 'There is already a directory with such name. ' +
            'Please, choose another project title.'
          : true;
      else
        return 'Project name may only include letters, ' +
               'numbers, underscores and hashes.';
    }
  },
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

  /* ************************ LANG QUESTIONS  *********************** */

  {
    name: questionTitles.choice,
    type: 'list',
    when: res => res[questionTitles.lang] === 'typescript' ? true : false,
    message: 'What project would you like to generate?',
    choices: tsTemplates
  },

  /* ********************** CLIENT QUESTIONS  *********************** */

  {
    name: questionTitles.framework,
    type: 'list',
    when: res => res[questionTitles.choice] === 'client' ? true : false,
    message: 'Choose frontend framework:',
    // choices: tsClientFrameworks
    choices: ['Angular']
  },
  // {
  //   name: questionTitles.clientType,
  //   type: 'list',
  //   when: res => res[questionTitles.choice] === 'client' ? true : false,
  //   message: 'Create new project from scratch or use one of provided templates?',
  //   choices: ['New', 'Template']
  // },

  /* ******************** CLIENT & NEW QUESTIONS  ******************** */

  // {
  //   name: questionTitles.router,
  //   type: 'list',
  //   when: res =>
  //     res[questionTitles.choice] === 'client' &&
  //     res[questionTitles.clientType] === 'New'
  //       ? true
  //       : false,
  //   message: 'Add routing?',
  //   choices: ['Yes', 'No']
  // },
  // {
  //   name: questionTitles.router,
  //   type: 'list',
  //   when: res =>
  //     res[questionTitles.choice] === 'client' &&
  //     res[questionTitles.clientType] === 'New'
  //       ? true
  //       : false,
  //   message: 'Add Material Design?',
  //   choices: ['Yes', 'No']
  // },

  /* ***************** CLIENT & TEMPLATE QUESTIONS  ****************** */

  {
    name: questionTitles.clientTemplate,
    type: 'list',
    when: res =>
      res[questionTitles.choice] === 'client' &&
      // res[questionTitles.clientType] === 'Template' &&
      res[questionTitles.framework] === 'Angular'
        ? true
        : false,
    message: 'Choose template:',
    choices: tsAngularTemplates
  },
  {
    name: questionTitles.clientTemplate,
    type: 'list',
    when: res =>
      res[questionTitles.choice] === 'client' &&
      // res[questionTitles.clientType] === 'Template' &&
      res[questionTitles.framework] === 'React'
        ? true
        : false,
    message: 'Choose template:',
    choices: tsReactTemplates
  },

  /* ********************** SERVER QUESTIONS  ********************** */

  {
    name: questionTitles.redis,
    type: 'list',
    when: res => res[questionTitles.choice] === 'server' ? true : false,
    message: 'Add RedisDB for cache?',
    choices: ['Yes', 'No']
  },
  {
    name: questionTitles.db,
    type: 'list',
    when: res => res[questionTitles.choice] === 'server' ? true : false,
    message: 'What database are you going to use?',
    choices: ['MongoDB', 'None']
  },
  {
    name: questionTitles.docker,
    type: 'list',
    when: res => res[questionTitles.choice] === 'server' ? true : false,
    message: 'Add Docker & Docker-compose?',
    choices: ['Yes', 'No']
  },

  /* ******************** FULLSTACK QUESTIONS  ********************* */

  {
    name: questionTitles.fullstackTemplate,
    type: 'list',
    when: res => res[questionTitles.choice] === 'fullstack' ? true : false,
    message: 'Choose template:',
    choices: tsFullstackTemplates
  },
];
