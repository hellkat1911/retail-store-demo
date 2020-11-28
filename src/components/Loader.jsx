import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress, Grid } from '@material-ui/core';
import Page from '../components/Page';
import Content from '../components/Content';

const useStyles = makeStyles(theme => ({
  spinner: {
    left: '50%',
    padding: '100px 0',
    position: 'relative',
  }
}));

const Loader = props => {
  const classes = useStyles();

  return (
    <Page>
      <Content>
        <Grid className={classes.container} justify="center" container spacing={0}>
          <Grid item sm={12}>
            <div className={classes.spinner}>
              <CircularProgress color="secondary" />
            </div>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

export default Loader;
