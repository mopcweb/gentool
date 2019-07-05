/* ################################################################### */
/*
/*  Root Dashboard component
/*
/* ################################################################### */

import { Component, OnInit, DoCheck, ViewChild, HostListener } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Routes
import { routes } from '../../utils/routes';

// =====> Services
import { UserService } from '../../services';

// =====> Component config
@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.sass'],
  templateUrl: './dashboard.component.html'
})

/* ------------------------------------------------------------------- */
/*                            Component
/* ------------------------------------------------------------------- */

export class DashboardComponent implements OnInit, DoCheck {

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  // Vars
  public routes = routes;
  public username = 'New User';
  public mode = window.innerWidth < 599 ? 'over' : 'side';

  // Breadcrumbs config
  public notFoundIcon = 'not_listed_location';
  public separator = 'keyboard_arrow_right';
  public iconsClass = 'material-icons';

  // Refs
  @ViewChild('drawer', { static: true }) public drawer: any;

  // Listeners
  @HostListener('window:resize', ['$event'])
  onResize = (event: any) => event.target.innerWidth < 599
    ? this.mode = 'over'
    : this.mode = 'side';

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
    // Log out
    if (!this.user.get)
      this.user.logOut();
  }

  /* ------------------------------------------------------------------- */
  /*              Close Nav on click out of Nav or on NavLink
  /* ------------------------------------------------------------------- */

  toggle(e: any) {
    // If window width >599 ps -> stop
    if (window.innerWidth > 599)
      return;

    // Else:
    if (
      (!e.target.closest('.Nav') || e.target.closest('.Nav-Link')) && !e.target.closest('.Openner')
    )
      this.drawer.close();
  }
}
