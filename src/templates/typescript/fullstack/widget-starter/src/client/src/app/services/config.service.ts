/* ################################################################### */
/*
/*  Service for getting credentials from Scala / CM
/*
/* ################################################################### */

import { Injectable } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Config
import { lsConfigForEws } from '../utils/config';

// =====> Interfaces
import { ICreds, IConfig } from '../interfaces';

// =====> Service config
@Injectable({
  providedIn: 'root'
})

/* ------------------------------------------------------------------- */
/*                              Service
/* ------------------------------------------------------------------- */

export class ConfigService {

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  private config: IConfig;

  /* ------------------------------------------------------------------- */
  /*                            Constructor
  /* ------------------------------------------------------------------- */

  public constructor() { }

  /* ------------------------------------------------------------------- */
  /*                         Getter for config
  /* ------------------------------------------------------------------- */


  public get get(): IConfig | Promise<IConfig> {
    if (this.config)
      return this.config;
    else if (window.localStorage.getItem(lsConfigForEws))
      return JSON.parse(window.localStorage.getItem(lsConfigForEws));
    else
      return this.request();
  }

  /* ------------------------------------------------------------------- */
  /*                         Getter for instance
  /* ------------------------------------------------------------------- */


  public get instance(): string {
    if (this.config)
      return this.config.instance;
    else if (window.localStorage.getItem(lsConfigForEws))
      return JSON.parse(window.localStorage.getItem(lsConfigForEws)).instance;
    else
      return undefined;
  }

  /* ------------------------------------------------------------------- */
  /*                     HARDCODED: Get signet config
  /* ------------------------------------------------------------------- */


  public get signet(): IConfig {
    // Update config
    this.config = {
      creds: {
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        client: 'client',
        app: 'app',
        instance: 'instance',
      },
      profile: 'profile',
      instance: 'signet'
    };

    // Save to ls
    window.localStorage.setItem(lsConfigForEws, JSON.stringify(this.config));

    // Return
    return this.config;
  }

  /* ------------------------------------------------------------------- */
  /*                     HARDCODED: Get signet config
  /* ------------------------------------------------------------------- */


  public get dev(): IConfig {
    // Update config
    this.config = {
      creds: {
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        client: 'client',
        app: 'app',
        instance: 'instance',
      },
      profile: 'profile',
      instance: 'dev'
    };

    // Save to ls
    window.localStorage.setItem(lsConfigForEws, JSON.stringify(this.config));

    // Return
    return this.config;
  }

  /* ------------------------------------------------------------------- */
  /*                          Request config
  /* ------------------------------------------------------------------- */

  private async request(): Promise<IConfig> {
    const { creds, profile, instance } = this.dev;

    // Config
    const config: IConfig = {
      creds, profile, instance
    };

    // Save to ls
    window.localStorage.setItem(lsConfigForEws, JSON.stringify(config));

    // Update var
    this.config = config;

    // Return
    return config;
  }
}
