/* ################################################################### */
/*
/*  Alert reducer
/*
/* ################################################################### */

import * as actionTypes from '../actions/actionTypes';

/* ------------------------------------------------------------------- */
/*                               Types
/* ------------------------------------------------------------------- */

import { Alert } from '../utils/state';

type Action = {
  type: string,
  payload?: string | number
};

/* ------------------------------------------------------------------- */
/*                   Helpers for show / hide Alert
/* ------------------------------------------------------------------- */

const show = (status: string, msg: string): Alert =>
  ({ show: true, status, msg });

const hide = (status: string, msg: string): Alert =>
  ({ show: false, status, msg });

/* ------------------------------------------------------------------- */
/*                              Reducer
/* ------------------------------------------------------------------- */

const alert = (state: any = {}, action: Action) => {
  const { type, payload } = action;
  const { status, msg } = state;

  switch (type) {
    case actionTypes.OK:
      const ok: string = (typeof payload === 'string' && payload)
        ? payload
        : `${type} was successful!`;
      return { ...state, ...show('ok', ok) }

    case actionTypes.INFO:
      const info: string = (typeof payload === 'string' && payload)
        ? payload
        : `Useful info about: ${type}!`;
      return { ...state, ...show('info', info) }

    case actionTypes.WARN:
      const warn: string = (typeof payload === 'string' && payload)
        ? payload
        : `Warn while proceeding: ${type}!`;
      return { ...state, ...show('warn', warn) }

    case actionTypes.ERROR:
      const error: string = (typeof payload === 'string' && payload)
        ? payload
        : `Error with - ${type}!`;
      return { ...state, ...show('error', error) }

    case actionTypes.HIDE_ALERT:
      return { ...state, ...hide(status, msg) }

    default:
      return state
  };
};

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default alert
