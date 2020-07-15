import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  searchroot: {
    padding: '2px 2px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '25px',
    border: '1px solid grey',
  },
  searchinput: {
    marginLeft: theme.spacing(3),
    flex: 1,
  },
  searchiconButton: {
    padding: 8,
  }
}));

export default function SearchLocationInput({input, ...custom}) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.searchroot}>
      <InputBase
            className={classes.searchinput}
            placeholder="Enter your address"
            {...input}
            {...custom}
        />
      <IconButton type="submit" className={classes.searchiconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}