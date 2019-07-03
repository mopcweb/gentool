/* ################################################################### */
/*
/*  Loader component
/*
/* ################################################################### */

import { Component, OnInit, DoCheck } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> Services
import { LoaderService } from '../../services';

// =====> Config component
@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})

/* ------------------------------------------------------------------- */
/*                             Component
/* ------------------------------------------------------------------- */

export class LoaderComponent implements OnInit, DoCheck {

  /* ------------------------------------------------------------------- */
  /*                             Vars
  /* ------------------------------------------------------------------- */

  public show: boolean;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(private loader: LoaderService) { }

  /* ------------------------------------------------------------------- */
  /*                        Lifecycle methods
  /* ------------------------------------------------------------------- */

  ngOnInit() {
    // Set initial value to show var
    this.show = this.loader.status;
  }

  ngDoCheck() {
    // Check for loader.enabled changes
    if (this.show !== this.loader.status)
      this.show = this.loader.status;
  }

}
