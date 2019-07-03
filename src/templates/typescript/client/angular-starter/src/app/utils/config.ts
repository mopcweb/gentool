/* ################################################################### */
/*
/*  Configs for app
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                              General
/* ------------------------------------------------------------------- */

// In ms
export const requestTimeout: number = 30 * 1000;

// Log out time (ms)
export const logOutTime: number = 5000;

/* ------------------------------------------------------------------- */
/*                            User service
/* ------------------------------------------------------------------- */

// =====> Keys for localStorage
export const lsUserLoggedIn: string = 'userLoggedIn';

export const usernameCookie: string = 'username';
export const tokenCookie: string = 'token';

// In days (Ex.: 1 = 1 day). 1 hour
export const cookieExpiration: number = 1 / 24;

// Path
export const cookiePath: string = '/';


/* ------------------------------------------------------------------- */
/*                               End
/* ------------------------------------------------------------------- */
