/* ################################################################### */
/*
/*  Actions (action creators)
/*
/* ################################################################### */

import * as actionTypes from './actionTypes';
import { Dispatch } from 'redux';

/* ------------------------------------------------------------------- */
/*                               Alert
/* ------------------------------------------------------------------- */

// =====> Hide
export const hideAlert = () => (dispatch: Dispatch) => dispatch({
  type: actionTypes.HIDE_ALERT
});

// =====> Common msgs
export const ok = (payload?: string | number) => (dispatch: Dispatch) => dispatch({
  type: actionTypes.OK,
  payload
});

export const info = (payload?: string | number) => (dispatch: Dispatch) => dispatch({
  type: actionTypes.INFO,
  payload
});

export const warn = (payload?: string | number) => (dispatch: Dispatch) => dispatch({
  type: actionTypes.WARN,
  payload
});

export const error = (payload?: string | number) => (dispatch: Dispatch) => dispatch({
  type: actionTypes.ERROR,
  payload
});

/* ------------------------------------------------------------------- */
/*                              Loader
/* ------------------------------------------------------------------- */

export const showLoader = () => (dispatch: Dispatch) => dispatch({
  type: actionTypes.SHOW_LOADER
});

export const hideLoader = () => (dispatch: Dispatch) => dispatch({
  type: actionTypes.HIDE_LOADER
});
