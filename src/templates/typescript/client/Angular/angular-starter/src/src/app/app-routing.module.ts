import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* ------------------------------------------------------------------- */
/*                             Pages
/* ------------------------------------------------------------------- */

import {
  DashboardComponent, HomeComponent, LoginComponent, LogoutComponent,
  NotFoundComponent, OfflineComponent, SettingsComponent
} from './pages';

/* ------------------------------------------------------------------- */
/*                             Services
/* ------------------------------------------------------------------- */

import { AuthService } from './services';

/* ------------------------------------------------------------------- */
/*                           Router routes
/* ------------------------------------------------------------------- */

// TODO: protect incorrect dynamic routes for unexistant clients

const routes: Routes = [
  // ********* REDIRECT FROM ROOT ********* //
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // ************* LOGIN PAGE ************* //
  { path: 'login', component: LoginComponent },

  // ************* DASHBOARD ************* //
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService],
    children: [
      // ************** HOME PAGE ************** //
      { path: '', component: HomeComponent },

      // *********** SETTING PAGE ************ //
      { path: 'settings', component: SettingsComponent },

      // *********** NOT FOUND PAGE *********** //
      { path: '**', component: NotFoundComponent },
    ]
  },

  // ************* OFFLINE PAGE ************ //
  { path: 'offline', component: OfflineComponent },

  // ************* LOGOUT PAGE ************ //
  { path: 'logout', component: LogoutComponent },

  // *********** NOT FOUND PAGE *********** //
  { path: '**', component: NotFoundComponent },
];

/* ------------------------------------------------------------------- */
/*                       Config and export module
/* ------------------------------------------------------------------- */

/* tslint:disable */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
