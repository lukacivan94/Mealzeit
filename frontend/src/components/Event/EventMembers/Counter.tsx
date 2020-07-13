import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2),
    }
  },
  button: {
    marginRight: theme.spacing(1),
    borderRadius: '50%',
    width: '10%',
    height: '60px',
    border: '1px solid grey',
    cursor: 'pointer',
  },
  margin: {
    justifyContent: 'center', 
    alignItems: "center",
    display: 'flex',
  },
  middle: {
      fontSize: '30px',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
      },
  },
  small: {
      fontSize: '18px',
      color: 'orange',
      marginRight: theme.spacing(1),
      textTransform: 'none',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
      },
  }
}));

const Counter = ({input, ...custom}) => {
  const classes = useStyles();
  //const [count, setCount] = React.useState(1);

  return (
    <div className={classes.root}>
       <div className={classes.margin}>
       <Button size="small" className={classes.small} disableRipple>Allow</Button>
          <TextField
              id="standard-number"
              type="number"
              {...input}
              {...custom}
              
            />
            
          <Button size="small" className={classes.small} disableRipple>people to join</Button>
        </div>
    </div>
  );
}

export default Counter;

