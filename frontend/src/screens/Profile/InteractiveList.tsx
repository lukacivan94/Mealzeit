import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    iconAccept: {
      fill: 'green',
    },
    iconReject: {
      fill: 'red',
  },
  }),
);


export default function InteractiveList(props) {
  const classes = useStyles();

  return (
    <div className={classes.demo}>
        <Divider variant="middle" />
            <List dense>
                <ListItem>
                  <ListItemText
                    primary={props.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="check">
                      <CheckCircleIcon className={classes.iconAccept} />
                      <CancelIcon className={classes.iconReject} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            </List>
            </div>
  );
}