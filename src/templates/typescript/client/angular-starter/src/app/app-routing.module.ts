import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* ------------------------------------------------------------------- */
/*                             Pages
/* ------------------------------------------------------------------- */

import {
  LoginComponent, LogoutComponent, DashboardComponent, HomeComponent,
  SettingsComponent, NotFoundComponent
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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
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
  { path: 'logout', component: LogoutComponent },

  // *********** NOT FOUND PAGE *********** //
  { path: '**', component: NotFoundComponent },
];

/* ------------------------------------------------------------------- */
/*                       Config and export module
/* ------------------------------------------------------------------- */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
