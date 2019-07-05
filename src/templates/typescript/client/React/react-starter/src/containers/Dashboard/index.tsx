/* ################################################################### */
/*
/*  Dashboard component
/*
/* ################################################################### */

import React, { useState } from 'react';
import { connect } from 'react-redux';

/* ------------------------------------------------------------------- */
/*                             Components
/* ------------------------------------------------------------------- */

import Header from './Header';
import Nav from './Nav';

/* ------------------------------------------------------------------- */
/*                              Material
/* ------------------------------------------------------------------- */

import { withStyles } from '@material-ui/styles';

// =====> Components
import Button from '@material-ui/core/Button';

/* ------------------------------------------------------------------- */
/*                               Config
/* ------------------------------------------------------------------- */

// =====> Actions
import { ok, info, warn, error, showLoader, hideLoader } from '../../actions';

// =====> Styles
import styles from './styles';

type Props = {
  classes: { [x: string]: string };
  ok: (payload?: string | number) => void;
  info: (payload?: string | number) => void;
  warn: (payload?: string | number) => void;
  error: (payload?: string | number) => void;
  showLoader: () => void;
  hideLoader: () => void;
};

/* ------------------------------------------------------------------- */
/*                              Component
/* ------------------------------------------------------------------- */

const Dashboard: React.FC<Props> = ({
  classes, ok, info, warn, error, showLoader, hideLoader
}) => {
  // State
  const [nav, setNav] = useState(false);

  // Handle open/close nav
  const toggleNav = () => setNav(!nav);

  // Render
  return (
    <div className={classes.Dashboard}>
      <Header toggleNav={toggleNav} />
      <Nav state={nav} toggle={toggleNav} />
      <div className={classes.Wrapper}>
        <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <Button children='Ok' onClick={() => ok('Ok')} />
          <Button children='Info' onClick={() => info('Info')} />
          <Button children='Warn' onClick={() => warn('Warn')} />
          <Button children='Error' onClick={() => error('Error')} />
        </div>

        <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <Button children='Show loader' onClick={showLoader} />
          <Button children='Hide loader' onClick={hideLoader} />
        </div>
      </div>
    </div>
  )
};

/* ------------------------------------------------------------------- */
/*                               Redux
/* ------------------------------------------------------------------- */

const mapDispatch = { ok, info, warn, error, showLoader, hideLoader };

/* ------------------------------------------------------------------- */
/*                               Export
/* ------------------------------------------------------------------- */

const Styled = withStyles(styles)(Dashboard);

export default connect(null, mapDispatch)(Styled);
