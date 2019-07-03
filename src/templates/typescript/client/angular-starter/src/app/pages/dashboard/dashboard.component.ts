/* ################################################################### */
/*
/*  Root Dashboard component
/*
/* ################################################################### */

import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> routes
import routes from '../../utils/routes';

// =====> Services
import { UserService } from '../../services';

// =====> Component config
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

/* ------------------------------------------------------------------- */
/*                            Component
/* ------------------------------------------------------------------- */

export class DashboardComponent implements OnInit, DoCheck {

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  public routes = routes;
  public username: string = 'New User';

  @ViewChild('drawer') public drawer: any;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    public user: UserService,
  ) { }

  /* ------------------------------------------------------------------- */
  /*                            Lifecycle
  /* ------------------------------------------------------------------- */

  public ngOnInit() {
    // Get user username
    this.username = this.user.get.username;
  }

  /* ------------------------------------------------------------------- */
  /*                      Check if user logged in
  /* ------------------------------------------------------------------- */

  ngDoCheck() {
    if (!this.user.get) {
      // Log out
      this.user.logOut();
    }
  }

  /* ------------------------------------------------------------------- */
  /*              Close Nav on click out of Nav or on NavLink
  /* ------------------------------------------------------------------- */

  toggle(e: any) {
    if (
      (!e.target.closest('.Nav') || e.target.closest('.Nav-Link')) && !e.target.closest('.Openner')
    )
      this.drawer.close();
  }
}
