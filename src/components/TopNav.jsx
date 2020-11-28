import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(1)
  },
  paper: {
    maxWidth: '100%',
    width: 300
  },
  navIcon: {
    marginRight: 20,
    stroke: '#000',
    strokeWidth: '0.5'
  },
  navLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  title: {
    flexGrow: 1
  },
  hidden: {
    display: 'none'
  }
}));

const TopNav = ({ history }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton 
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          aria-controls="nav-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          JC Yarbrough & Sons
        </Typography>
      </Toolbar>
      <Menu
        id="nav-menu"
        classes={{
          paper: classes.paper,
          list: classes.navItem
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link className={classes.navLink} to="/">
          <MenuItem onClick={handleClose}>
            <HomeIcon className={classes.navIcon} fontSize="large" />
            Home
          </MenuItem>
        </Link>
      </Menu>
    </AppBar>
  );
};

TopNav.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(TopNav);
