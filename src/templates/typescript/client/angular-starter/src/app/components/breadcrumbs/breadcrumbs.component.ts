/* ################################################################### */
/*
/*  Breadcrumbs component
/*
/* ################################################################### */

import { Component, OnInit } from '@angular/core';
import {
  Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET
} from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import routes from '../../utils/routes';

// =====> Constants
import { notFoundTitle, notFoundIcon } from '../../utils/constants';

// =====> Services
import { HelpersService, UserService } from '../../services';

// =====> Component config
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})

/* ------------------------------------------------------------------- */
/*                            Component
/* ------------------------------------------------------------------- */

export class BreadcrumbsComponent implements OnInit {

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  private routes = routes;
  public breadcrumbs: any = [];

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private user: UserService,
    private helpers: HelpersService
  ) { }

  /* ------------------------------------------------------------------- */
  /*                            Lifecycle
  /* ------------------------------------------------------------------- */

  public ngOnInit() {
    // Get breadCrumbs for the first time
    this.getBreadcrumbs(this.activatedRoute);

    // Update on location change
    this.updateBreadcrumbs();
  }

  /* ------------------------------------------------------------------- */
  /*                          Get breadcrumbs
  /* ------------------------------------------------------------------- */

  public updateBreadcrumbs() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe((data) => this.getBreadcrumbs(data));
  }

  /* ------------------------------------------------------------------- */
  /*                         Update breadCrumbs
  /* ------------------------------------------------------------------- */

  private getBreadcrumbs(data?: any) {
    // Refresh token to verify current user
    // this.user.refresh();

    // Reset
    this.breadcrumbs = [];

    // Url
    const fullUrl = this.router.routerState.snapshot.url;

    // Get custom fields from route
    const { dynamic, customIcon } = this.getCustomFileds(data);

    // Remove first '/' from url
    let croppedUrl = fullUrl.replace(/^\//, '');

    // Remove params
    croppedUrl = this.helpers.removeParams(croppedUrl);

    // Var for changing url
    let url: string = '';

    // Var for prev route
    let prevRoute: any;

    // Iterate over croppedUrl.slice('/') and create path for each link
    croppedUrl.split('/').forEach((item, i, arr) => {
      // Update link
      url = url + '/' + item;

      // Get title & icon for route
      let route = this.routes.find(item => item.link === url);

      // If there is route found -> save it as prev route
      if (route) prevRoute = route

      // If no route found -> try to find in its children
      if (!route && prevRoute) {
        let parent = this.routes.find(item => item.link === prevRoute.link);

        if (parent && parent.children)
          route = parent.children.find(item => item.link === url);
      };

      // Again make it: If there is route found -> save it as prev route
      if (route) prevRoute = route

      // Unit to push into breadcrumbs array
      const unit = {
        url: url,
        title: decodeURIComponent(route ? route.title : dynamic ? item : notFoundTitle),
        icon: route ? route.icon : customIcon ? customIcon : notFoundIcon
      };

      // If unit.title is not found -> skip if not last and push if last
      if (unit.title === notFoundTitle)
        return i !== arr.length - 1 ? false : this.breadcrumbs.push(unit)

      // Push into array
      this.breadcrumbs.push(unit)
    });

    // Log
    // console.log('=====> breadcrumbs', this.breadcrumbs);
  }

  /* ------------------------------------------------------------------- */
  /*                   Get custom fields from route
  /* ------------------------------------------------------------------- */

  private getCustomFileds(data: any) {
    // If route is dynamic (aka: /:id) -> define it
    const dynamic = data && data.data && data.data.value && data.data.value.dynamic
      ? data.data.value.dynamic
      : data && data.firstChild && data.firstChild.firstChild && data.firstChild.firstChild.routeConfig && data.firstChild.firstChild.routeConfig.data
        ? data.firstChild.firstChild.routeConfig.data.dynamic
        : false;

    // If route has custom icon -> define it
    const customIcon = data && data.data && data.data.value && data.data.value.icon
      ? data.data.value.icon
      : data && data.firstChild && data.firstChild.firstChild && data.firstChild.firstChild.routeConfig && data.firstChild.firstChild.routeConfig.data
        ? data.firstChild.firstChild.routeConfig.data.icon
        : false;

    // Return
    return { dynamic, customIcon };
  }

}
