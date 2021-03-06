/* ################################################################### */
/*
/*  NotFound page component
/*
/* ################################################################### */

import { Component, OnInit } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Routes
import { home } from '../../utils/routes';

// =====> Component config
@Component({
  selector: 'app-not-found',
  styleUrls: ['./not-found.component.sass'],
  templateUrl: './not-found.component.html'
})

/* ------------------------------------------------------------------- */
/*                              Component
/* ------------------------------------------------------------------- */

export class NotFoundComponent implements OnInit {

  public home = home;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor() { }

  /* ------------------------------------------------------------------- */
  /*                            Lifecycle
  /* ------------------------------------------------------------------- */

  ngOnInit() {
  }

}
