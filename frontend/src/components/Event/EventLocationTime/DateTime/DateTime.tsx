import React from 'react';
//import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

const DateTime = ({ input }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };  

  return (
    <div title="Enter a date">
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDateTimePicker
              {...input}
              clearable
              value={selectedDate}
              onChange={handleDateChange}
              label="Date Time Picker"
              format="yyyy/MM/dd hh:mm a"
              minDate={new Date()}
            />
          </Grid>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
    </div>
  );
}


export default DateTime;
