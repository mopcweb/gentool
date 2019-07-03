import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                         Cookies service
/* ------------------------------------------------------------------- */

import { CookieService } from 'ngx-cookie-service';

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
  MatExpansionModule, MatSelectModule, MatTableModule
} from '@angular/material';

/* ------------------------------------------------------------------- */
/*                            Components
/* ------------------------------------------------------------------- */

import {
  LoaderComponent, BreadcrumbsComponent, CardComponent
} from './components';

/* ------------------------------------------------------------------- */
/*                              Pages
/* ------------------------------------------------------------------- */

import {
  LoginComponent, LogoutComponent, DashboardComponent, HomeComponent,
  SettingsComponent, NotFoundComponent
} from './pages';

/* ------------------------------------------------------------------- */
/*                              Services
/* ------------------------------------------------------------------- */

import { AuthService, UserService, AlertService } from './services';

/* ------------------------------------------------------------------- */
/*                         Config AppModul
/* ------------------------------------------------------------------- */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
    HomeComponent,
    BreadcrumbsComponent,
    NotFoundComponent,
    SettingsComponent,
    CardComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatTableModule
  ],
  providers: [AuthService, UserService, CookieService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
