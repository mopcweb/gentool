/* ################################################################### */
/*
/*  Root app component
/*
/* ################################################################### */

import { Component, OnInit, DoCheck } from '@angular/core';
import axios from 'axios';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import { requestTimeout } from './utils/config';

// =====> Services
import { LoaderService, ConfigService } from './services';

// =====> Config component
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  templateUrl: './app.component.html'
})

/* ------------------------------------------------------------------- */
/*                            Component
/* ------------------------------------------------------------------- */

export class AppComponent implements OnInit, DoCheck {

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  public tabIndex = 0;
  public selectedIndex: number;
  public tabDisabled = false;
  public instance: string;
  private timer: any;
  private requests = 0;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    private loader: LoaderService,
    private config: ConfigService
  ) { }

  /* ------------------------------------------------------------------- */
  /*                             OnInit
  /* ------------------------------------------------------------------- */

  public async ngOnInit() {
    // Use axios interceptors
    this.axiosInterceptors();

    // Get instance
    this.instance = this.config.instance;

    // Change tabs
    // this.changeTabs();
  }

  /* ------------------------------------------------------------------- */
  /*                             DoCheck
  /* ------------------------------------------------------------------- */

  public async ngDoCheck() {
    if (this.instance !== this.config.instance)
      this.instance = this.config.instance;
  }

  /* ------------------------------------------------------------------- */
  /*                            Change tabs
  /* ------------------------------------------------------------------- */

  public changeTabs = () =>
    setInterval(() => this.tabIndex === 1
      ? this.tabIndex = 0
      : this.tabIndex++
    , 60000)

  /* ------------------------------------------------------------------- */
  /*                             Change tab
  /* ------------------------------------------------------------------- */

  public changeTab = (value: boolean) =>
    this.tabDisabled = value

  /* ------------------------------------------------------------------- */
  /*                         Axios Interceptors
  /* ------------------------------------------------------------------- */

  public axiosInterceptors() {
    // Default timeout (30 seconds)
    axios.defaults.timeout = requestTimeout;

    // Interceptor for all axios requests
    axios.interceptors.request.use(
      config => {
        // Clear timeout for loader
        clearTimeout(this.timer);

        // Increment requests counter
        this.requests ++;

        // Show loader before request
        this.loader.show();

        // Return config
        return config;
      },
      err => Promise.reject(err)
    );

    // Interceptor for all axios responses
    // To define internet connection
    axios.interceptors.response.use(
      res => {
        // Decrement requests counter
        this.requests --;

        // Hide loader
        if (!this.requests)
          this.timer = setTimeout(() => this.loader.hide(), 500);

        // Return res
        return res;
      },
      err => {
        // Decrement requests counter
        this.requests --;

        // Hide loader
        if (!this.requests)
          this.timer = setTimeout(() => this.loader.hide(), 500);

        // Return promise reject with err
        return Promise.reject(err);
      }
    );
  }

}
