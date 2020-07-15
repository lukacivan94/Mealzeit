import React from 'react';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

//import SearchLocationInput from './Location/SearchLocationInput';
import { StyleDiv, EventDiv, TextDiv } from '../../Styling/TextStyle';
import AlertMessage from '../AlertMessage';
import DatesList from './DateTime/DatesList';
import TabBar from '../TabBar';


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
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    buttondiv: {
        width: '100%',
        justifyContent: 'center', 
        paddingBottom: '10px',
        alignItems: "center",
        display: 'flex',
    },
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

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

const required = value => value ? undefined : 'Required';

const validate = values => {
    const errors = { dateOfPublish: '', loaction: ''};
    const requiredFields = [
        'dateOfPublish',
        'location'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    return errors;
};
interface LocationDateProps {
    course: boolean;
    handleBack();
};

const EventLocationTimeInput = ({ course, handleBack, handleSubmit }: LocationDateProps & InjectedFormProps<{}, LocationDateProps>) => {
        const classes = useStyles();
        return (
            <div>
                <TabBar>
                    <form onSubmit={handleSubmit}>
                        <StyleDiv>
                            <EventDiv>
                                <TextDiv>
                                    Where are you planning your event?
                                </TextDiv>
                                <Field
                                    validate={[ required ]}
                                    name='location'
                                    label='location'
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
                                    name='dateOfPublish'
                                    label='date of publish'
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
                    </form>
                </TabBar>
                <div className={classes.buttondiv}>
                    <Button
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        RETURN
                    </Button>
                    <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleSubmit}>
                        Next
                    </Button>
                </div>
            </div>
        );
};

const renderSearchBar = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
}) => {
    const classes = useStyles();
    return(
        <div>
            <Paper className={classes.searchroot}>
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
            {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
        </div>
    );
};

const renderDateBar = ({
    multiple,
    input,
    meta: { touched, invalid, error },
}) => {
    const dateString : Object[] = [];
    const dateListVal : Date[] = [];
    const [dateArray, setDateArray] = React.useState(dateString);
    const [DateList, setDateList] = React.useState(dateListVal);
    const title = multiple ? "Enter multiple dates" : "Enter a date";

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
        setDateList(DateList.splice(ids, 1));
    }

    const handleDateChange = (date) => {
        if(date) {
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
                    setDateList([...DateList, date])
                    setCount(count + 1);
                } else {
                    setDateArray([{key: count, label: currentLabel, value: date} ]);
                    setDateList([date])
                }
            };
        };
      };

    return(
        <div title={title}>
            <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <KeyboardDateTimePicker
                    {...input}
                    //defaultValue = {''} 
                    onChange={value => {
                        if(multiple) {
                            input.onChange(DateList || '');
                            handleDateChange(value ||'');
                        } else {
                            input.onChange(value || '');
                            handleDateChange(value ||'');
                        }
                    }}
                    format="yyyy/MM/dd hh:mm a"
                    minDate={new Date()}
                    //helperText={''}
                />
                </Grid>
            </MuiPickersUtilsProvider>
            {multiple ? <DatesList dates={ dateArray } id={handleDeleteId}/> : null}
            </MuiThemeProvider>
            {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
    </div>
    );
}


export default reduxForm<{}, LocationDateProps>({
    form: 'EventLocationTimeInput',
    validate,
  })(EventLocationTimeInput);