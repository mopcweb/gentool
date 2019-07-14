/* ################################################################### */
/*
/*  App store
/*
/* ################################################################### */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/* ------------------------------------------------------------------- */
/*                             Reducers
/* ------------------------------------------------------------------- */

import rootReducer from '../reducers';

/* ------------------------------------------------------------------- */
/*                           Initial State
/* ------------------------------------------------------------------- */

const initialState: { [x: string]: any } = {};

/* ------------------------------------------------------------------- */
/*                            Init Store
/* ------------------------------------------------------------------- */

const initStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );

  store.subscribe(() => console.log('[ =====> STATE <===== ]', store.getState()));

  return store;
}

/* ------------------------------------------------------------------- */
/*                             Export
/* ------------------------------------------------------------------- */

export default initStore;
