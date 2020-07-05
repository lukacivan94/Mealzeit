import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginBottom: theme.spacing(2),
        }
      },
      margin: {
        justifyContent: 'center', 
        alignItems: "center",
        display: 'flex',
      },
  }));

export default function FormControlLabelPlacement() {
  const classes = useStyles();
  return (
    <FormControl component="fieldset" className={classes.root}>
      <RadioGroup row aria-label="position" name="position" defaultValue="top" className={classes.margin}>
        <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes, Sure!" />
        <FormControlLabel value="no" control={<Radio color="primary" />} label="No, I will reply to each request myself." />
      </RadioGroup>
    </FormControl>
  );
}