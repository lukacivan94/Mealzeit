import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardCookroom from './CardCookroom';
import CardCourse from './CardCourse';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function GridList(props) {
  const classes = useStyles();
  const { type, joined } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
        <CardCourse type={type} joined={joined}/>
        </Grid>
        <Grid item xs={4}>
        <CardCourse type={type} joined={joined}/>
        </Grid>
        <Grid item xs={4}>
        <CardCourse type={type} joined={joined}/>
        </Grid>
        <Grid item xs={4}>
        <CardCourse type={type} joined={joined}/>
        </Grid>
      </Grid>
    </div>
  );
}