#!/usr/bin/env node

/* ################################################################### */
/*
/*  Core
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Config
import { dir } from './utils/config';

// =====> Services
import {
  prompt, start, addMongo, getSubstring, insert
} from './services';

/* ------------------------------------------------------------------- */
/*                               Init
/* ------------------------------------------------------------------- */

// addMongo(dir + '/basic');
// const substr = getSubstring(dir + '/some/src/docker-compose.yml', ':');
// console.log('substr >>>', substr);

// const test = insert(dir + '/some/src/docker-compose.yml', 'test', ':');
// console.log('test >>>', test);

start();

prompt();
