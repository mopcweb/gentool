/* ################################################################### */
/*
/*  All app routes
/*
/* ################################################################### */

import { IAngularRoute } from 'angular-breadcrumbs-light';

/* ------------------------------------------------------------------- */
/*                               Routes
/* ------------------------------------------------------------------- */

// =====> Genereal routes
export const login = '/login';
export const logout = '/logout';
export const offline = '/offline';

// =====> Dashboard routes
export const dashboard = '/dashboard';
export const home = dashboard;
export const settings = home + '/settings';

/* ------------------------------------------------------------------- */
/*                  Routes array (For Nav & Breadcrumbs)
/* ------------------------------------------------------------------- */

export const routes: IAngularRoute[] = [
  { link: home, title: 'Home', icon: 'home', iconClass: 'material-icons' },
  { link: settings, title: 'Settings', icon: 'settings', iconClass: 'material-icons' }
];
