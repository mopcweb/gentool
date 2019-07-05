/* ################################################################### */
/*
/*  Alert component
/*
/* ################################################################### */

import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';

/* ------------------------------------------------------------------- */
/*                              Actions
/* ------------------------------------------------------------------- */

import { hideAlert } from '../../actions';

/* ------------------------------------------------------------------- */
/*                              Material
/* ------------------------------------------------------------------- */

// =====> Components
import { withStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

// =====> Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Styles
import styles from './styles';

// =====> Define object with Icons
const variantIcon: any = {
  ok: CheckCircleIcon,
  warn: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

// =====> Types
type Props = {
  classes: { [x: string]: string },
  hideAlert: () => void,
  alert: any
};

/* ------------------------------------------------------------------- */
/*                              Component
/* ------------------------------------------------------------------- */

const Alert: React.FC<Props> = ({ classes, hideAlert, alert }) => {
  // Choose Icon depending on status
  const Icon = variantIcon[alert.status];

  // Handler for close -> avoid clickaway
  const close = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway')
      return;

    hideAlert();
  };

  // Render
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      open={alert.show}
      onClose={close}
    >
      <SnackbarContent
        className={`${classes.Alert} ${classes[alert.status]}`}
        aria-describedby='message-id'
        classes={{ message: classes.Content, action: classes.IconClose }}
        message={
          <span id='message-id' className={classes.Message}>
            {alert.status &&
              <Icon className={classes.Icon} />}
            {alert.msg}
          </span>
        }
        action={[
          <IconButton key='close' aria-label='Close' color='inherit'
            onClick={hideAlert}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
};

/* ------------------------------------------------------------------- */
/*                              Redux
/* ------------------------------------------------------------------- */

const mapState = (state: any) => ({ alert: state.alert });

const mapDispatch = { hideAlert };

/* ------------------------------------------------------------------- */
/*                Apply styles, Connect Redux & Export
/* ------------------------------------------------------------------- */

const Styled = withStyles(styles)(Alert);

export default connect(mapState, mapDispatch)(Styled);
