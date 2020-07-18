import React from 'react';
import { Field, FieldArray, reduxForm, InjectedFormProps, formValueSelector, change as changeFieldValue } from 'redux-form';
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

import moment from 'moment';
import { StyleDiv, EventDiv, TextDiv } from '../../Styling/TextStyle';
import AlertMessage from '../AlertMessage';
import TabBar from '../TabBar';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';


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
        marginTop: '30px',
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
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    iconReject: {
        fill: 'red',
    },
    extendedIcon: {
        marginRight: '3px',
    },
    margin: {
        marginBottom: theme.spacing(2),
    },
}));

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

const required = value => value ? undefined : 'Required';

const validate = values => {
    const errors = { dateOfPublish: '', location: ''};
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



const renderListOfDates = ({ fields, meta: { error } }) => {
    
    const classes = useStyles();
    return (
    <div>
        <MuiThemeProvider theme={theme}>
        <Fab className={classes.margin} color='primary'  variant="extended" onClick={() => fields.push()}>
            <AddIcon className={classes.extendedIcon} />
            Add Date
      </Fab>
      </MuiThemeProvider>
      {fields.map((date, index) => (

        <div className={classes.demo}  key={index}>
            <Divider variant="middle" />
            <List dense>
                <ListItem>
                    <Field
                        validate={[ required ]}
                        name={date}
                        type="text"
                        component={renderDateTime}
                        label={`date #${index + 1}`}
                    />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="check"  onClick={() => fields.remove(index)}>
                        <DeleteIcon className={classes.iconReject} />
                    </IconButton>
                </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
      ))}
      <Divider variant="middle" />
      {(error && <AlertMessage>{error}</AlertMessage>)}
    </div>
  );
};

const renderDateTime = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
}) => {
  return (
        <div title="Enter a date">
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDateTimePicker
                {...input}
                format="yyyy/MM/dd hh:mm a"
                minDate={new Date()}
                helperText={''} 
                />
            </Grid>
        </MuiPickersUtilsProvider>
        </MuiThemeProvider>
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
        </div>
    );
};



interface LocationDateProps {
    isCourse: boolean;
    handleBack();
};

const EventLocationTimeInput = ({ isCourse, handleBack, handleSubmit }: LocationDateProps & InjectedFormProps<{}, LocationDateProps>) => {
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
                                {
                                    isCourse
                                    ?
                                    <FieldArray 
                                        validate={[ required ]}
                                        name='dateOfPublish' 
                                        label='date of publish'
                                        component={renderListOfDates} 
                                        />        
                                    :
                                    <Field
                                        validate={[ required ]}
                                        name='dateOfPublish'
                                        label='date of publish'
                                        component={renderDateTime}
                                    />
                                    
                                }
                               
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



export default reduxForm<{}, LocationDateProps>({
    form: 'EventLocationTimeInput',
    validate
    // validate,
    // initialValues: {
    //     dateOfPublish: [moment(new Date()).format('YYYY-MM-DD')]
    // }
  })(EventLocationTimeInput);




