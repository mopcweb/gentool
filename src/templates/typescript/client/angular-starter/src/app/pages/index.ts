/* ################################################################### */
/*
/*  Root file for all components. Imports and exports all
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                            Import all
/* ------------------------------------------------------------------- */

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export {
  LoginComponent,
  LogoutComponent,
  SettingsComponent,
  NotFoundComponent,
  DashboardComponent,
  HomeComponent,
};
