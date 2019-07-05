/* ################################################################### */
/*
/*  Service which provides small useful functions (methods)
/*
/* ################################################################### */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> Services
import { UserService } from './user.service';

// =====> Config service
@Injectable({
  providedIn: 'root'
})

/* ------------------------------------------------------------------- */
/*                             Service
/* ------------------------------------------------------------------- */

export class HelpersService {

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    private user: UserService,
    private router: Router
  ) { }

  /* ------------------------------------------------------------------- */
  /*                      Convert into FormData
  /* ------------------------------------------------------------------- */

  public formUrlEncoded = (x: any) =>
     Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

  /* ------------------------------------------------------------------- */
  /*                       Remove params from url
  /* ------------------------------------------------------------------- */

  public removeParams = (url: string): string => url.replace(/\?.*/gi, '');

  /* ------------------------------------------------------------------- */
  /*                       Check if object isEmpty
  /* ------------------------------------------------------------------- */

  public isEmpty = (obj: { [x: string]: any }): boolean => {
    for (const key in obj)
      if (obj.hasOwnProperty(key))
        return false;

    return true;
  };

  /* ------------------------------------------------------------------- */
  /*                       Get current route title
  /* ------------------------------------------------------------------- */

  public routeTitle = () =>
    decodeURIComponent(this.router.url.replace(/\/.*\//gi, ''))

  /* ------------------------------------------------------------------- */
  /*                          Get parent path
  /* ------------------------------------------------------------------- */

  public parentRoute = () =>
    decodeURIComponent(this.router.url.match(/\/.*\//)[0])

}
