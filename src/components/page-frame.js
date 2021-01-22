import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 50,
    minHeight: 500,
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%',
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: '90%',
    },
    margin: 'auto',
  },
}));

export default function PageFrame(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
}
