# Gen Tool Starter

[![GitHub version](https://img.shields.io/badge/version-0.1.0-yellow.svg)](https://github.com/mopcweb/gentool/releases) [![npm version](https://img.shields.io/npm/v/gentool.svg)](https://www.npmjs.com/package/gentool) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mopcweb/gentool/blob/master/LICENSE)

## Description

Tool creates basic structure for new project.

For now creates anything in TypeScript.

Plans for future:

 - [ ] Provide templates in JavaScript
 - [ ] Provide ability to choose React for client-side projects (with / without Redux)
 - [ ] Adding PostgreSQL / MySQL database options for server templates
 - [ ] Add AWS sign-in template

## Usage

### With installation

```bash
# Install globally
npm i -g gentool

# Use
gentool
```

### Without installation

```bash
npx gentool
```

##	Prerequisites

For Windows users:

 - Use tool in some bash (cmder, Git bash, etc...)

## Variants

### Server Templates

Creates basic server.

_Options_:

 - Redis
 - Database (For now only Mongo)
 - Docker

_Structure for basic server:_

```bash
├── src
│   ├── server
│   │   ├── controllers
│   │	│   └── index.ts
│   │   ├── interfaces
│   │	│   ├── IMsg.ts
│   │	│	└── index.ts
│   │   ├── middlewares
│   │	│   ├── checkMethod.ts
│   │	│   ├── index.ts
│   │	│	└── setHeaders.ts
│   │   ├── models
│   │	│   └── index.ts
│   │   ├── routes
│   │	│   ├── error.ts
│   │	│   ├── health.ts
│   │	│   ├── index.ts
│   │	│	└── info.ts
│   │   ├── services
│   │	│   ├── DocsApiService.ts
│   │	│   ├── Helpers.ts
│   │	│   ├── index.ts
│   │	│   ├── LoggerService.ts
│   │	│	└── ResponseService.ts
│   │   ├── utils
│   │	│   ├── config.ts
│   │	│   ├── constants.ts
│   │	│   ├── health.html
│   │	│	└── routes.ts
│   │	└── index.ts
│   ├── .env
│   ├── nodemon.json
│   ├── package.json
│   ├── tsconfig.json
│   └── tslint.json
├── README.md
├── .editorconfig
└── .gitignore
```

_For RedisDB option there is also:_

 - CacheService.ts (set, get, del, clear dbs)
 - API for cache clear

_For Database (MongoDB) option there is also:_

 - LoggerService saves loges to the Mongo Logs collection
 - Logs Mongo Model
 - Database controller (Set up / close connection, Error handling)
 - Logs controller (Read, Delete)
 - API for logs

_For Docker option there is also:_

 - .dockerignore
 - Dockerfile for server
 - docker-compose.yml (with optional options: Redis, Mongo)

### Client Templates

For now there is only one template for Angular 8.

Template __angular-starter:__

_Options_: Material Design. Dashboard with auth, loader, snackbars, breadcrumbs & nav

_Structure for app directory:_

```bash
├── src
│   ├── components
│   │   ├── card
│   │   ├── loader
│   │	└── index.ts
│   ├── interfaces
│   │	└── index.ts
│   ├── pages
│   │   ├── dashboard
│   │   ├── home
│   │   ├── login
│   │   ├── logout
│   │   ├── not-found
│   │   ├── offline
│   │   ├── settings
│   │	└── index.ts
│   ├── services
│   │   ├── tests
│   │   ├── alert.service.ts
│   │   ├── auth.service.ts
│   │   ├── cookies.service.ts
│   │   ├── helpers.service.ts
│   │   ├── index.ts
│   │   ├── loader.service.ts
│   │	└── user.service.ts
│   ├── utils
│   │	├── config.ts
│   │	├── constants.ts
│   │	├── routes.ts
│   │	└── variables.sass
├── app-routing.module.ts
├── app.component.html
├── app.component.sass
├── app.component.spec.ts
├── app.component.ts
└── app.module.ts
```

### Fullstack (client + server) Templates

For now there is only one template for Widget

Template __widget-starter:__

_Stack_:

 - Angular 8 ( + Material Design)
 - Node + Express
 - RedisDB

_Structure:_
```bash
├── src
│   ├── client (without routing. Just App component + header + loader + some services for getting data from server API)
│   ├── server (basic server + RedisDB structure)
│   ├── .dockerignore
│   ├── .env
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── env.ts (Parse .env for client-side usage)
│   ├── nodemon.json
│   ├── package.json
│   ├── tsconfig.json
│   └── tslint.json
├── README.md
├── .editorconfig
└── .gitignore
```
