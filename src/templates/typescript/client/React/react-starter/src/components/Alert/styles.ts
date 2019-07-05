/* ################################################################### */
/*
/*  Alert styles
/*
/* ################################################################### */

import { Theme } from '@material-ui/core/styles';

/* ------------------------------------------------------------------- */
/*                              Styles
/* ------------------------------------------------------------------- */

export default (theme: Theme | any): any => ({
  Alert: { flexWrap: 'initial', width: '500px', maxWidth: '95%' },
  ok: { backgroundColor: theme.palette.ok.main },
  info: { backgroundColor: theme.palette.primary.main },
  warn: { backgroundColor: theme.palette.warn.main },
  error: { backgroundColor: theme.palette.error.dark },
  Icon: { opacity: 0.9, marginRight: theme.spacing(2) },
  IconClose: { flexShrink: 0 },
  Message: { display: 'flex', alignItems: 'center' },
});
