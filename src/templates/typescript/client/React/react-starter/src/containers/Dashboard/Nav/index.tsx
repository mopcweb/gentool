/* ################################################################### */
/*
/*  Nav component
/*
/* ################################################################### */

import React from 'react';
import { NavLink } from 'react-router-dom';

/* ------------------------------------------------------------------- */
/*                            Material
/* ------------------------------------------------------------------- */

import { withStyles } from '@material-ui/styles';

// =====> Components
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// =====> Icons
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SettingsIcon from '@material-ui/icons/Settings';
import InputIcon from '@material-ui/icons/Input';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Routes
import { routes } from '../../../utils/routes';

// =====> Styles
import styles from './styles';

// =====> Route icons
const icons: any = {
  Home: <HomeIcon />,
  Planner: <CalendarTodayIcon />,
  Settings: <SettingsIcon />
};

// =====> Type
type Props = {
  classes: { [x: string]: string };
  state: boolean;
  toggle: (event: React.MouseEvent) => void
};

/* ------------------------------------------------------------------- */
/*                             Component
/* ------------------------------------------------------------------- */

const Nav: React.FC<Props> = ({ classes, state, toggle }) => (
  <Drawer open={state} onClose={toggle} variant='temporary' classes={{ paper: classes.Nav }}>
    <List className={classes.List}>
      {routes.map(item => (
        <NavLink
          exact to={item.link}
          key={item.title}
          activeClassName={classes.Item_active}
          onClick={toggle}
        >
          <ListItem button>
            <ListItemIcon>{icons[item.title]}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </NavLink>
      ))}
    </List>
    <Divider />
    <ListItem button onClick={toggle}>
      <ListItemIcon><InputIcon /></ListItemIcon>
      <ListItemText primary='Logout' />
    </ListItem>
  </Drawer>
);

/* ------------------------------------------------------------------- */
/*                              Export
/* ------------------------------------------------------------------- */

export default withStyles(styles)(Nav);
