import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import logo from '../logo.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#96d8969e'
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logoImg: {
      width: '100%',
      textAlign: 'center',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(7)
    },
    orderCompleteMessage: {
      fontSize: '22px'
    }
  }),
);

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" >
        <Grid item xs={6} >
          <img className={classes.logoImg} id="logo" src={logo} alt="Logo" />
        </Grid>
      </Grid>
    </div>
  );
}

