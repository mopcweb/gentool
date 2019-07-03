/* ################################################################### */
/*
/*  Root app component
/*
/* ################################################################### */

import { Component, OnInit } from '@angular/core';

import axios from 'axios';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import { requestTimeout } from './utils/config';

// =====> Services
import { UserService, LoaderService, CookiesService } from './services'

// =====> Component config
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
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
    private user: UserService,
    private loader: LoaderService,
    private cookies: CookiesService
  ) { }

  /* ------------------------------------------------------------------- */
  /*                            Lifecycle
  /* ------------------------------------------------------------------- */

  ngOnInit() {
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

  axiosInterceptors() {
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
        return res
      },
      err => {
        // Hide loader
        setTimeout(() => this.loader.hide(), 500);

        // If network error -> redirect to offline page
        // if (err.response === undefined) {
        //   // Show error msg
        //   this.alertService.show(this.offline.errorMsg, 'error', null, true)
        //
        //   // Show msg in console
        //   console.log('=====> You are offline <=====');
        //
        //   // Redirect to offline page
        //   this.router.navigate([routes.OFFLINE]);
        // };
        //
        // // If Mongo Connection Error
        // if (err.response.status === 500) {
        //   // Define current location (should not be login/register/forgotPwd)
        //   const location = [
        //     routes.LOGIN, routes.REGISTER, routes.FORGOT_PWD
        //   ].find(item => item === window.location.pathname);
        //
        //   if (!location) {
        //     // Show error msg
        //     this.alertService.show(this.constants.connectionErrMsg, 'error', null, true)
        //
        //     // Log out
        //     setTimeout(this.handleLogOut, 5000);
        //   };
        // };

        // For debug in browser while dev
        // if (err.response !== undefined) {
        //   err.response.data
        //     ? console.log(err.response.data)
        //     : console.log(err.response);
        // }

        // Return promise reject with err
        return Promise.reject(err);
      }
    );
  }

}
