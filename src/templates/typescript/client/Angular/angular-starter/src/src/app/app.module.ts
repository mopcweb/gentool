import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                         External services
/* ------------------------------------------------------------------- */

// =====> Cookies service
import { CookieService } from 'ngx-cookie-service';

// =====> Breadcrumbs
import { AngularBreadcrumbsLightModule } from 'angular-breadcrumbs-light';

/* ------------------------------------------------------------------- */
/*                           Router & App
/* ------------------------------------------------------------------- */

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* ------------------------------------------------------------------- */
/*                             Material
/* ------------------------------------------------------------------- */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSnackBarModule, MatProgressSpinnerModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatButtonModule, MatDividerModule,
  MatSidenavModule, MatRippleModule, MatToolbarModule, MatCardModule,
  MatListModule, MatMenuModule, MatDialogModule, MatPaginatorModule,
  MatTabsModule, MatCheckboxModule, MatSlideToggleModule,
  MatExpansionModule, MatSelectModule, MatTableModule, MatProgressBarModule
} from '@angular/material';

/* ------------------------------------------------------------------- */
/*                            Components
/* ------------------------------------------------------------------- */

import { LoaderComponent, CardComponent } from './components';

/* ------------------------------------------------------------------- */
/*                              Pages
/* ------------------------------------------------------------------- */

import {
  DashboardComponent, HomeComponent, LoginComponent, LogoutComponent,
  NotFoundComponent, OfflineComponent, SettingsComponent
} from './pages';

/* ------------------------------------------------------------------- */
/*                              Services
/* ------------------------------------------------------------------- */

import { AuthService, UserService, AlertService } from './services';

/* ------------------------------------------------------------------- */
/*                         Config AppModul
/* ------------------------------------------------------------------- */

/* tslint:disable */
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
    HomeComponent,
    NotFoundComponent,
    SettingsComponent,
    CardComponent,
    LogoutComponent,
    OfflineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularBreadcrumbsLightModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatRippleModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSelectModule,
    MatTableModule,
    MatProgressBarModule
  ],
  providers: [AuthService, UserService, CookieService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
