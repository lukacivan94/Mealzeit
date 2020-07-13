import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'red',
      fontSize: '12px',
    },
    icon: {
      fill: "red",
      marginRight: '5px',
      transform: 'scale(0.7)',
    }
  }),
);

export default function AlertMessage(props) {
  const classes = useStyles();
    const { children } = props;
  return (
      <span className={classes.root}>
        <ErrorOutlineIcon className={classes.icon}/>{ children }
      </span>
  );
}