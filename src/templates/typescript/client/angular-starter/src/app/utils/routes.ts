/* ################################################################### */
/*
/*  All app routes
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                            Interfaces
/* ------------------------------------------------------------------- */

interface IAngularRoute {
  link: string;
  title?: string;
  suffix?: string;
  icon?: any;
  children?: IAngularRoute[];
};

/* ------------------------------------------------------------------- */
/*                          General routes
/* ------------------------------------------------------------------- */

export const login = '/login';
export const logout = '/logout';

export const dashboard: string = '/dashboard';
export const home = dashboard;
export const settings = home + '/settings';

/* ------------------------------------------------------------------- */
/*                          Routes for nav
/* ------------------------------------------------------------------- */

const routes: IAngularRoute[] = [
  { title: 'Home', link: home, icon: 'home' },
  { title: 'Settings', link: settings, icon: 'settings' }
];

/* ------------------------------------------------------------------- */
/*                          Export routes
/* ------------------------------------------------------------------- */

export default routes
