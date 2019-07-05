/* ################################################################### */
/*
/*  Root app component
/*
/* ################################################################### */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import axios from 'axios';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import { requestTimeout } from './utils/config';

// =====> Routes
import { offline } from './utils/routes';

// =====> Services
import {
  UserService, LoaderService, CookiesService, AlertService
} from './services';

// =====> Component config
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  templateUrl: './app.component.html'
})

/* ------------------------------------------------------------------- */
/*                             Component
/* ------------------------------------------------------------------- */

export class AppComponent implements OnInit {

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  private loggedUser: any;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    private router: Router,
    private user: UserService,
    private loader: LoaderService,
    private cookies: CookiesService,
    private alert: AlertService
  ) { }

  /* ------------------------------------------------------------------- */
  /*                            Lifecycle
  /* ------------------------------------------------------------------- */

  public ngOnInit() {
    this.axiosInterceptors();

    // Update logged user - get cookies
    this.loggedUser = this.cookies.get;

    // Set user
    if (this.loggedUser.username && this.loggedUser.token)
      this.user.set(this.loggedUser);
  }

  /* ------------------------------------------------------------------- */
  /*                         Axios Interceptors
  /* ------------------------------------------------------------------- */

  private axiosInterceptors() {
    // Default timeout (30 seconds)
    axios.defaults.timeout = requestTimeout;

    // Interceptor for all axios requests
    axios.interceptors.request.use(
      config => {
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
        // Hide loader
        setTimeout(() => this.loader.hide(), 500);

        // Return res
        return res;
      },
      err => {
        // Hide loader
        setTimeout(() => this.loader.hide(), 500);

        // If network error -> redirect to offline page
        this.handleOffline();

        // Return promise reject with err
        return Promise.reject(err);
      }
    );
  }

  /* ------------------------------------------------------------------- */
  /*                        Handle User Offline
  /* ------------------------------------------------------------------- */

  private handleOffline() {
    // Stop if online
    if (window.navigator.onLine)
      return;

    // Show error msg
    this.alert.warn('You\'re offline. Please, check your internet connection');

    // Show msg in console
    console.log('=====> You are offline <=====');

    // Redirect to offline page
    this.router.navigate([offline]);
  }

}
