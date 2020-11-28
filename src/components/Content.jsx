import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inner: {
    color: '#fff',
    background: '#303f9f',
    margin: '0 auto',
    maxWidth: '100%',
    padding: '20px 20px 50px',
    width: 1200
  }
}));

const Content = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.inner}>
      {props.children}
    </Paper>
  );
};

export default Content;
