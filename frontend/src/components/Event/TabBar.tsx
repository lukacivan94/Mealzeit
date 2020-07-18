import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 950,
    borderRadius: '25px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 0px 21px 0px rgba(145,142,145,1)',
    padding: '30px',
  },
}));

export default function TabBar(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.root}>
        <div className={classes.wrapper}>
        { children }
        </div>
    </div>
  );
}

