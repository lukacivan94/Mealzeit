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
import Tooltip from '@material-ui/core/Tooltip';


/*
* Listing the request from the users in panels with accept/reject icons at the end.
*/


// Basic Styling specification of the all the components
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

// Interface specification for the exported default component and constants
interface Props {
  name: any;
  key: any;
  id: any;
  addToMember: any;
  rejectRequest: any;
}


export default function InteractiveList(props: Props) {
  
  const classes = useStyles();
 
  const handleAcceptRequest = () => {
    props.addToMember(props.id, props.name);
  };

  const handleRejectRequest = () => {
    props.rejectRequest(props.id);
  };


  return (
    <div className={classes.demo}>
        <Divider variant="middle" />
        <List dense>
            <ListItem>
              <ListItemText
                primary={props.name}
              />
              <ListItemSecondaryAction>
              
                <Tooltip title="accept request" placement="bottom">
                  <IconButton edge="end" aria-label="check" onClick={handleAcceptRequest}>
                    <CheckCircleIcon className={classes.iconAccept}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="reject request" placement="bottom">
                  <IconButton edge="end" aria-label="cross" onClick={handleRejectRequest}>
                    <CancelIcon className={classes.iconReject} />
                  </IconButton>
                </Tooltip>
                
              </ListItemSecondaryAction>
            </ListItem>
        </List>
      </div>
  );
}