import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: 100,
  }
}));

const Page = props => {
  const classes = useStyles();

  return (
    <section id="view-container" className={classes.main}>
      {props.children}
    </section>
  );
};

export default Page;
