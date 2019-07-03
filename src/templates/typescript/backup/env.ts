/* ################################################################### */
/*
/*  Convert .env for client side usage
/*
/* ################################################################### */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// Iterate over process.env -> add to env string all vars
let env = '';
for (const key in process.env)
  env += `  ${JSON.stringify(key)}: ${JSON.stringify(process.env[key])},\n`;

// Client environment paths
const prodPath = `./client/src/environments/environment.prod.ts`;
const devPath = `./client/src/environments/environment.ts`;

// Client environment data
const prodEnv =
`\
/* tslint:disable */

export const environment: any = {
  production: true,
  ${env}
};
`;

const devEnv =
`\
/* tslint:disable */

export const environment: any = {
  production: false,
  ${env}
};
`;

// Write to files
fs.writeFileSync(prodPath, prodEnv);
fs.writeFileSync(devPath, devEnv);
