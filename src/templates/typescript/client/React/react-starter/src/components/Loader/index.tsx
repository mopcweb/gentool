/* ################################################################### */
/*
/*  Loader component
/*
/* ################################################################### */

import React from 'react';
import { connect } from 'react-redux';

/* ------------------------------------------------------------------- */
/*                              Material
/* ------------------------------------------------------------------- */

import { withStyles } from '@material-ui/styles';

// =====> Components
import CircularProgress from '@material-ui/core/CircularProgress';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Styles
import styles from './styles';

// =====> Types
import { State, Loader as LoaderType } from '../../utils/state';

type Props = {
  classes: { [x: string]: string };
  loader: LoaderType;
};

/* ------------------------------------------------------------------- */
/*                              Component
/* ------------------------------------------------------------------- */

const Loader: React.FC<Props> = ({ classes, loader }) => loader.show
  ? <div className={classes.Loader}>
      {loader.show && <CircularProgress size={100} />}
    </div>
  : null;

/* ------------------------------------------------------------------- */
/*                               Redux
/* ------------------------------------------------------------------- */

const matState = (state: State) => ({ loader: state.loader });

/* ------------------------------------------------------------------- */
/*                               Export
/* ------------------------------------------------------------------- */

const Styled = withStyles(styles)(Loader);

export default connect(matState)(Styled);
