/* ################################################################### */
/*
/*  Loader styles
/*
/* ################################################################### */

import { Theme } from '@material-ui/core/styles';

/* ------------------------------------------------------------------- */
/*                              Styles
/* ------------------------------------------------------------------- */

export default (theme: Theme | any): any => ({
  Loader: {
    position: 'fixed',
    top: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: `calc(100% - ${theme.spacing(8)}px)`,
    backgroundColor: theme.palette.common.lightdarkTransparent,
    zIndex: 999,

    '@media screen and (max-width: 599px)': {
      top: theme.spacing(7),
      height: `calc(100% - ${theme.spacing(7)}px)`,
    }
  }
});
