/* ################################################################### */
/*
/*  Root app component
/*
/* ################################################################### */

import { Component, OnInit } from '@angular/core';
import axios from 'axios';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import { api } from '../../utils/config';

// =====> Services
import { AlertService, ConfigService } from '../../services';

// =====> Config component
@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.sass'],
  templateUrl: './header.component.html'
})

/* ------------------------------------------------------------------- */
/*                            Component
/* ------------------------------------------------------------------- */

export class HeaderComponent implements OnInit {

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  public date: string;
  public time: string;
  public instance: string;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    private alert: AlertService,
    private config: ConfigService
  ) { }

  /* ------------------------------------------------------------------- */
  /*                             OnInit
  /* ------------------------------------------------------------------- */

  public async ngOnInit() {
    this.updateDateTime();
  }

  /* ------------------------------------------------------------------- */
  /*                          Update dateTime
  /* ------------------------------------------------------------------- */

  public updateDateTime() {
    // Get time for the first time
    this.getDateTime();

    // Set interval for updating each second
    setInterval(() => this.getDateTime(), 1000);
  }

  /* ------------------------------------------------------------------- */
  /*                          Get dateTime
  /* ------------------------------------------------------------------- */

  public getDateTime() {
    // Get current date
    const date = new Date();

    // Options for Intl for date
    const optionsDate = { weekday: 'long', month: 'short', day: 'numeric' };

    // Options for Intl for date
    const optionsTime = { hour: 'numeric', minute: 'numeric' };

    // Update vars
    this.date = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
    this.time = new Intl.DateTimeFormat('en-US', optionsTime).format(date);
  }

  /* ------------------------------------------------------------------- */
  /*               EVENT HANDLER: Clear redis cache & reload
  /* ------------------------------------------------------------------- */

  public clearCache = async () =>
    await axios
      .get(`${api.cache}/clear`)
      .then(res => {
        this.alert.ok(res.data.data);
        this.refreshPage();
      })
      .catch(err => err && err.response && err.response.data
        ? this.alert.error(err.response.data)
        : this.alert.error('Unable to clear cache'))

  /* ------------------------------------------------------------------- */
  /*                    EVENT HANDLER: Refresh page
  /* ------------------------------------------------------------------- */

  public refreshPage = () =>
    window.location.reload()

  /* ------------------------------------------------------------------- */
  /*             EVENT HANDLER: Clear Local storage & reload
  /* ------------------------------------------------------------------- */

  public clearLs = () => {
    // Clear LS
    window.localStorage.clear();

    // Show alert`
    this.alert.ok('Local storage data cleared');

    // Reload
    this.refreshPage();
  }

  /* ------------------------------------------------------------------- */
  /*                   EVENT HANDLER: Change config
  /* ------------------------------------------------------------------- */

  public changeConfig = async () => {
    // Get current instance
    this.instance = this.config.instance;

    // Update config
    this.instance = this.instance === 'dev'
      ? this.config.signet.instance
      : this.config.dev.instance;

    // Show alert`
    this.alert.ok(`Config changed to: ${this.instance}`);
  }

}
