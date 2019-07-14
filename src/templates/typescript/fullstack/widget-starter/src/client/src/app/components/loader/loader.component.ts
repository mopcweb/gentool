/* ################################################################### */
/*
/*  Loader component
/*
/* ################################################################### */

import { Component, OnInit, DoCheck, Input } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> Services
import { LoaderService } from '../../services';

// =====> Config component
@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.sass'],
  templateUrl: './loader.component.html'
})

/* ------------------------------------------------------------------- */
/*                             Component
/* ------------------------------------------------------------------- */

export class LoaderComponent implements OnInit, DoCheck {

  /* ------------------------------------------------------------------- */
  /*                             Vars
  /* ------------------------------------------------------------------- */

  // Show / hide flag
  public show: boolean;

  // Loader type (spinner / progress)
  @Input() type = 'progress';

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
