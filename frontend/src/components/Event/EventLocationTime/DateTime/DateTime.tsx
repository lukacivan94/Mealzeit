import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import DatesList from './DatesList';

const dateString : Object[] = [];

const useStyles = makeStyles((theme) => ({
    button: {
        background: '#F88805',
        color: 'white',
        fontSize: '1.3em',
        margin: '1.5em',
        padding: '0.5em 1em',
        border: '2px solid #F88805',
        borderRadius: '25px',
        outline: 'None',
    },
    form: {
      backgroundColor: 'lightgrey',
    }
}));

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});


const validate = (selectedDate) => {
  const errors = {};
  if ((new Date(selectedDate) < new Date())) {
    // set date error validation true 
  } else {
    // null or false date error validation 
  }
}

export const MaterialUIPickers = ({ multiple, input }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [dateArray, setDateArray] = React.useState(dateString);
  const title = multiple ? "Enter multiple dates" : "Enter a date";
  const classes = useStyles();


  const [count, setCount] = React.useState(0);

  const handleDeleteId = (ids) => {
    setDateArray((dates) => dates.filter((chip ?: any) => chip.key  !== ids));

  }

  const getDateString = (dateval) => {
    var month = dateval.getUTCMonth() + 1; 
    var day = dateval.getUTCDate();
    var year = dateval.getUTCFullYear();
    var hour = dateval.getHours();
    var addon = dateval.getMinutes() < 10 ? '0' : '';
    var minute = addon + dateval.getMinutes();
    var result = month+'/'+day+'/'+year+'  '+hour+':' + minute;
    return result;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (multiple) {
      setDateArray([ ...dateArray, {key: count, label: getDateString(date), value: date} ]);
      setCount(count + 1);
      setSelectedDate(null);
    } else {
      setDateArray([{key: count, label: getDateString(date), value: date} ]);
    }
  };

  const handleReset = () => {
    console.log(dateArray);
  };

  

  return (
    <div title={title}>
      <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDateTimePicker
            //{...input}
            clearable
            value={selectedDate}
            onChange={handleDateChange}
            label="Date Time Picker"
            format="yyyy/MM/dd hh:mm a"
          />
        </Grid>
      </MuiPickersUtilsProvider>
    {multiple ? <DatesList dates={ dateArray } id={handleDeleteId}/> : null}
    <button className={classes.button} onClick={handleReset}>console log dates</button>
    </MuiThemeProvider>
    </div>
  );
}


export default MaterialUIPickers;
