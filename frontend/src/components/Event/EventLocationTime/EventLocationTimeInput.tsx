import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Divider from '@material-ui/core/Divider';

//import MaterialUIPickers from './DateTime/DateTime';
import SearchLocationInput from './Location/SearchLocationInput';
import { StyleDiv, EventDiv, TextDiv } from '../../Styling/TextStyle';



import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import AlertMessage from '../AlertMessage';
import DatesList from './DateTime/DatesList';


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

const required = value => value ? undefined : 'Required';

const validate = values => {
    const errors = { };
    const requiredFields = [
        'dateBar',
        'SearchBar'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    return errors;
};

const EventLocationTimeInput = props => {
    const { course } = props;
        return (
            <StyleDiv>
                <EventDiv>
                    <TextDiv>
                        Where are you planning your event?
                    </TextDiv>
                    <Field
                        validate={[ required ]}
                        name='searchBar'
                        component={renderSearchBar}
                    />
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextDiv>
                        When are you planning your event?
                    </TextDiv>
                    <Field
                        validate={[ required ]}
                        name='dateBar'
                        component={renderDateBar}
                        props={{
                            type: Boolean
                        }}
                        {...{
                           multiple: course
                        }}
                    />
                    
                </EventDiv>
            </StyleDiv>
        );
};

const renderSearchBar = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
}) => {
    return(
        <div>
            <SearchLocationInput
                {...input}
                {...custom}
            />
            {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
        </div>
    );
};

const renderDateBar = ({
    multiple,
    input,
    meta: { touched, invalid, error },
}) => {
    const [dateArray, setDateArray] = React.useState(dateString);
    const title = multiple ? "Enter multiple dates" : "Enter a date";
    const classes = useStyles();
    var date = input.value;
    const [count, setCount] = React.useState(0);

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
    

    const handleDeleteId = (ids) => {
        setDateArray((dates) => dates.filter((chip ?: any) => chip.key  !== ids));
    }

    const handleDateChange = (date) => {
        const currentLabel = getDateString(date);
        let duplicate = false;
        dateArray.forEach(
            (element ?: any) => {
                if(element.label === currentLabel){
                    duplicate = true;
                }
            }
        );
        if(!duplicate){
            if (multiple) {
            setDateArray([ ...dateArray, {key: count, label: currentLabel, value: date} ]);
            setCount(count + 1);
            } else {
            setDateArray([{key: count, label: currentLabel, value: date} ]);
            }
        };
      };


  const handleReset = () => { 
      console.log(dateArray);
  };
    return(
        <div title={title}>
            <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <KeyboardDateTimePicker
                    {...input}
                    onChange={value => {
                        input.onChange(value);
                        handleDateChange(value);
                    }}
                    format="yyyy/MM/dd hh:mm a"
                    minDate={new Date()}
                />
                </Grid>
            </MuiPickersUtilsProvider>
            {multiple ? <DatesList dates={ dateArray } id={handleDeleteId}/> : null}
            <button className={classes.button} onClick={handleReset}>console log dates</button>
            </MuiThemeProvider>
            {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
    </div>
    );
}


export default reduxForm({
    form: 'EventLocationTimeInput',
    validate,
  })(EventLocationTimeInput);