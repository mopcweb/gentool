/* ################################################################### */
/*
/*  Service for managing logged user over app. Stores in var,
/*  localStorage and sessionStorage
/*
/* ################################################################### */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> Config
import { lsUserLoggedIn, logOutTime } from '../utils/config';

// =====> Routes
import { logout } from '../utils/routes';

// =====> StatusCodes
import { BAD_REQUEST, UNAUTHORIZED } from 'http-status';

// =====> Services
import { CookiesService } from './cookies.service';
import { AlertService } from './alert.service';

/* ------------------------------------------------------------------- */
/*                           Service config
/* ------------------------------------------------------------------- */

@Injectable({
  providedIn: 'root'
})

/* ------------------------------------------------------------------- */
/*                              Service
/* ------------------------------------------------------------------- */

export class UserService {

  /* ------------------------------------------------------------------- */
  /*                             Vars
  /* ------------------------------------------------------------------- */

  // =====> User
  private user: any;
  private logOutStatus: boolean;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    private router: Router,
    private cookies: CookiesService,
    private alert: AlertService,
  ) { }

  /* ------------------------------------------------------------------- */
  /*                            Set user
  /* ------------------------------------------------------------------- */

  public set(user?: { [x: string]: any }): void {
    try {
      // Save into var
      this.user = JSON.stringify(user);

      // Save into localStorage & sessionStorage
      window.localStorage.setItem(lsUserLoggedIn, this.user);
      window.sessionStorage.setItem(lsUserLoggedIn, this.user);

      // Parse and return user
      return JSON.parse(this.user);
    } catch (err) {
      // Log
      console.log('[ =====> INVALID CREDENTIALS <===== ]', err);

      // Return
      return;
    }
  }

  /* ------------------------------------------------------------------- */
  /*                            Get user
  /* ------------------------------------------------------------------- */

  public get get(): { [x: string]: any } {
    try {
      // Define storages
      const ls = window.localStorage.getItem(lsUserLoggedIn);
      const ss = window.sessionStorage.getItem(lsUserLoggedIn);

      // If one of them is empty -> another should push
      if (ls && !ss) window.sessionStorage.setItem(lsUserLoggedIn, ls);
      if (!ls && ss) window.localStorage.setItem(lsUserLoggedIn, ss);

      // Parse and return user
      return JSON.parse(this.user || ls || ss);
    } catch (err) {
      // Log
      console.log('[ =====> INVALID CREDENTIALS <===== ]', err);

      // Return
      return;
    }
  }

  /* ------------------------------------------------------------------- */
  /*                           Refresh token
  /* ------------------------------------------------------------------- */

  public async refresh(): Promise<boolean> {
    // Var for response
    let response: boolean;

    // Method
    const method = 'GET';

    // Url
    const url = `.../refresh`;

    // Headers
    const headers = {
      token: this.get.token
    };

    // Refresh token
    await axios({ url, method, headers })
      .then(res => {
        // Log
        console.log('[ =====> IN USER_SERVICE: REFRESH TOKEN <===== ]');

        // Update logged user - get cookies
        const user = {
          token: res.data.data.access_token,
          username: this.get.username
        };

        // Set user
        if (user.token && user.username) {
          // Update user
          this.set(user);

          // Remove cookies if they are
          this.cookies.rm();

          // Set new cookies
          this.cookies.set(user.username, user.token);
        }

        // Update response var
        response = true;
      })
      .catch(err => {
        // Update response var
        response = false;

        // Log
        console.log(
          '[ =====> ERROR IN USER_SERVICE: REFRESH TOKEN <===== ]', err.response
        );

        // If no explicit response provided -> stop
        if (!err || !err.response || !err.response.data)
          return;

        // Save data var from convenience
        const { data } = err.response;

        // If refresh token expired or invalid -> log out
        if (
          (data.status === BAD_REQUEST && data.data.error === 'invalid_grant') ||
          data.status === UNAUTHORIZED
        )
          this.logOut();
      });

    // Return
    return response;
  }

  /* ------------------------------------------------------------------- */
  /*                           Logout user
  /* ------------------------------------------------------------------- */

  public logOut(manual = false) {
    // If already loggin out -> stop
    if (this.logOutStatus) return;

    // Update logging out status
    this.logOutStatus = true;

    // Reset user
    this.reset();

    // Show alert
    this.alert.warn(
      `${manual ? '' : 'Session expired. '}You will be logged out in ${logOutTime / 1000} seconds`,
      true,
      +logOutTime - 100
    );

    // Navigate to login page after 5 seconds
    setTimeout(() => {
      // Update logging out status
      this.logOutStatus = false;

      // Navigate
      this.router.navigate([logout]);
    }, logOutTime);
  }

  /* ------------------------------------------------------------------- */
  /*                           Reset user
  /* ------------------------------------------------------------------- */

  public reset(): void {
    // Reset user var
    this.user = undefined;

    // Remove item from localStorage & sessionStorage
    window.localStorage.removeItem(lsUserLoggedIn);
    window.sessionStorage.removeItem(lsUserLoggedIn);

    // Remove cookies
    this.cookies.rm();
  }

}
