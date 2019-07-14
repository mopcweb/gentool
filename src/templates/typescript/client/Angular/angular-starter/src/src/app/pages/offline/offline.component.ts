/* ################################################################### */
/*
/*  Offline page component
/*
/* ################################################################### */

import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Routes
import { home } from '../../utils/routes';

// =====> Services
import { AlertService } from '../../services';

// =====> Component config
@Component({
  selector: 'app-offline',
  styleUrls: ['./offline.component.sass'],
  templateUrl: './offline.component.html'
})

/* ------------------------------------------------------------------- */
/*                              Component
/* ------------------------------------------------------------------- */

export class OfflineComponent implements OnInit, DoCheck {

  public home = home;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    private router: Router,
    private alert: AlertService
  ) { }

  /* ------------------------------------------------------------------- */
  /*                            OnInit
  /* ------------------------------------------------------------------- */

  ngOnInit() {
  }

  /* ------------------------------------------------------------------- */
  /*                            DoCheck
  /* ------------------------------------------------------------------- */

  ngDoCheck() {
    if (window.navigator.onLine)
      return this.router.navigate([home]);
  }

  /* ------------------------------------------------------------------- */
  /*               EVENT HANDLER: Check if still offline
  /* ------------------------------------------------------------------- */

  public handleOffline() {
    // If online -> go to homepage
    if (window.navigator.onLine)
      return this.router.navigate([home]);

    // Else -> Show error msg
    this.alert.warn('You\'re still offline. Please, check your internet connection');

    // Show msg in console
    console.log('=====> You\'re still offline <=====');
  }

}
