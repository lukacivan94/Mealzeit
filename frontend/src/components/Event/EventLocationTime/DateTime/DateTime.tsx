import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  validate,
} from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import DatesList from './DatesList';
import { ButtonStyle } from '../../../Styling/TextStyle';

const dateString : Object[] = [];

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});



export default function MaterialUIPickers({ multiple }) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [dateArray, setDateArray] = React.useState(dateString);
  const title = multiple ? "Enter multiple dates" : "Enter a date";

  const [count, setCount] = React.useState(0);

  const handleDeleteId = (ids) => {
    //dateString.splice(dateString.findIndex(e => e.key === ids),1);
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
            clearable
            value={selectedDate}
            onChange={handleDateChange}
            label="Date Time Picker"
            format="yyyy/MM/dd hh:mm a"
          />
        </Grid>
      </MuiPickersUtilsProvider>
    {multiple ? <DatesList dates={ dateArray } id={handleDeleteId}/> : null}
    <ButtonStyle onClick={handleReset}>console log dates</ButtonStyle>
    </MuiThemeProvider>
    </div>
  );
}
