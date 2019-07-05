/* ################################################################### */
/*
/*  Dashboard styles
/*
/* ################################################################### */

import { Theme } from '@material-ui/core/styles';

/* ------------------------------------------------------------------- */
/*                              Styles
/* ------------------------------------------------------------------- */

export default (theme: Theme) => ({
  Dashboard: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    width: '100%',
    height: '100%',

    '@media screen and (max-width: 599px)': {
      paddingTop: theme.spacing(7),
    }
  },
  Wrapper: {
    padding: theme.spacing(3),
    width: '100%',
    height: '100%',
  }
});
