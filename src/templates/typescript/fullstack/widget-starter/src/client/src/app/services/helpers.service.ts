/* ################################################################### */
/*
/*  Service for helpers
/*
/* ################################################################### */

import { Injectable } from '@angular/core';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

@Injectable({
  providedIn: 'root'
})

/* ------------------------------------------------------------------- */
/*                               Service
/* ------------------------------------------------------------------- */

export class HelpersService {

  /* ------------------------------------------------------------------- */
  /*                             Add zero
  /* ------------------------------------------------------------------- */

  public addZero = (data: number): string =>
  +data < 10 && +data >= 0 ? '0' + data : '' + data;

  /* ------------------------------------------------------------------- */
  /*                      Convert into FormData
  /* ------------------------------------------------------------------- */

  public formUrlEncoded = (x: any) =>
     Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

  /* ------------------------------------------------------------------- */
  /*                       Remove params from url
  /* ------------------------------------------------------------------- */

  public removeParams = (url: string): string => url.replace(/\?.*/gi, '');

  /* ------------------------------------------------------------------- */
  /*                       Check if object isEmpty
  /* ------------------------------------------------------------------- */

  public isEmpty = (obj: { [x: string]: any }): boolean => {
    for (const key in obj)
      if (obj.hasOwnProperty(key))
        return false;

    return true;
  };

  /* ------------------------------------------------------------------- */
  /*                            Get day
  /* ------------------------------------------------------------------- */

  public getDay() {
    // Date
    const date = new Date();

    // Options for Intl for date
    const options = { weekday: 'long', month: 'short', day: 'numeric' };

    // Specify date for view layer
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  /* ------------------------------------------------------------------- */
  /*                            Get week
  /* ------------------------------------------------------------------- */

  public getWeek() {
    // Date
    const date = new Date();

    // Get today
    const today = date.getDate();
    const todayIndex = date.getDay() === 0
      ? 7
      : date.getDay();

    // Determine last day of this week
    const fromDay = today - todayIndex + 1;
    const dueDay = today - todayIndex + 7;

    // Determine date for lastDay
    const fromDate = new Date(new Date().setDate(fromDay));
    const dueDate = new Date(new Date().setDate(dueDay));

    // Options for Intl for date
    const options = { weekday: 'long', month: 'short', day: 'numeric' };

    // Specify date for view layer
    const week =
      new Intl.DateTimeFormat('en-US', options).format(fromDate)
       + ' - ' +
      new Intl.DateTimeFormat('en-US', options).format(dueDate);

    // Return
    return { fromDate, dueDate, week };
  }

}
