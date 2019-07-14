/* ################################################################### */
/*
/*  Core app module
/*
/* ################################################################### */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                             Animations
/* ------------------------------------------------------------------- */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* ------------------------------------------------------------------- */
/*                              Material
/* ------------------------------------------------------------------- */

import {
  MatToolbarModule, MatTabsModule, MatListModule, MatIconModule,
  MatProgressSpinnerModule, MatCardModule, MatButtonModule,
  MatProgressBarModule, MatMenuModule, MatSnackBarModule
} from '@angular/material';

/* ------------------------------------------------------------------- */
/*                            Services
/* ------------------------------------------------------------------- */

import { DataService } from './services';

/* ------------------------------------------------------------------- */
/*                            Components
/* ------------------------------------------------------------------- */

import { AppComponent } from './app.component';
import { HeaderComponent, LoaderComponent } from './components';

/* ------------------------------------------------------------------- */
/*                               Module
/* ------------------------------------------------------------------- */

/* tslint:disable */
@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
