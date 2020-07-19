import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { Field, FieldArray, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

import {TextSmallDiv } from '../../../components/Styling/TextStyle';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import AlertMessage from '../../../components/Event/AlertMessage';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';



/*
* Helper component to load data from Parent component for the courses.
* All the Fields are created with initialized values from the backend so that the user can
* view their old filled values and make changes accordingly.
*/



const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
  });

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
      backButton: {
        marginRight: theme.spacing(1)
      },
      buttondiv: {
          width: '100%',
          justifyContent: 'center', 
          paddingBottom: '10px',
          alignItems: "center",
          display: 'flex',
          marginTop: '30px',
        },
        box: {
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '10px',
        }, 
        divider: {
            padding: 0,
            margin: 0,
        },
        searchroot: {
            paddingLeft: theme.spacing(3),
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            width: '90%',
            borderRadius: '25px',
            border: '1px solid grey',
        },
        searchinput: {
            display: 'flex',
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
        buttonmargin: {
            marginBottom: theme.spacing(2),
        },
  }));

const required = value => value ? undefined : 'Required';
const RangePrice = value => value && (Number(value) < 0 || Number(value)>5000) ? 'Invalid Price, enter from 0 to 5000!': undefined;


const validate = values => {
    const errors = { title:'', description:'', isVirtual:'', requiredItems:'',price: '',  dateOfPublish: '', location: ''};
    const requiredFields = [
        'title',
        'description',
        'isVirtual',
        'requiredItems',
        'price',
        'dateOfPublish',
        'location'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    if(+values.price){
      if(+values.price>5000 || +values.price<0) {
        errors.price = 'Invalid price entered';
      }
  }
    return errors;
};

const RadioSelect = ({ input, ...rest }) => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset" className={classes.root}>
      <RadioGroup row aria-label="position" name="position" defaultValue="top" className={classes.margin} {...input}{...rest}>
        <FormControlLabel value="yes" control={<Radio style={{ color: 'darkorange' }} />} label='Yes' />
        <FormControlLabel value="no" control={<Radio style={{ color: 'darkorange' }} />} label='No' />
      </RadioGroup>
    </FormControl>
  );
};

interface GenInfoProps {
    isVirtual: any
    price: any
    title: any
    description: any
    isPremium: any
    dateOfPublish: any
    location: any
    key: any
}

const GenInfo = ({ isVirtual, price, title, description, isPremium,  handleSubmit }: GenInfoProps & InjectedFormProps<{}, GenInfoProps>) => {
      const classes = useStyles();      
      return (
          <div>
                <MuiThemeProvider theme={theme}>
                  <Grid container spacing={0}>
                        <Grid item xs={12} className={classes.box}>
                            <TextSmallDiv>Title</TextSmallDiv>
                            <Field
                                validate={[ required ]}
                                name='title'
                                component={renderTitle}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />
                  <Grid container spacing={0}>
                        <Grid item xs={6} className={classes.box}>
                            <TextSmallDiv>Location</TextSmallDiv>
                            <Field
                                    validate={[ required ]}
                                    name='location'
                                    label='location'
                                    component={renderSearchBar}
                            />
                            
                        </Grid>
                        <Divider className={classes.divider} orientation="vertical" flexItem />
                        <Grid item xs={5} className={classes.box}>
                            <TextSmallDiv>Description</TextSmallDiv>
                            <Field
                                validate={[ required ]}
                                name='description'
                                component={renderDescription}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />                   
                    <Grid container>
                        <Grid item xs={3} className={classes.box}>
                          <TextSmallDiv> Is the Event virtual?</TextSmallDiv>
                          <Field
                              validate={[ required ]}
                              name='isVirtual'
                              component={RadioSelect}
                              fullWidth
                          />
                        </Grid>
                        <Divider className={classes.divider}  orientation="vertical" flexItem />
                        <Grid item xs={4} className={classes.box}>
                          <TextSmallDiv>Price of Course</TextSmallDiv>
                            <Field
                                validate={[ required, RangePrice ]}
                                name='price'
                                component={renderPriceOfCourse}
                                fullWidth
                            />
                        </Grid>
                         <Divider className={classes.divider} orientation="vertical" flexItem />
                        <Grid item xs={3} className={classes.box}>
                            <TextSmallDiv> Is the Event premium?</TextSmallDiv>
                            <Field
                                validate={[ required ]}
                                name='isPremium'
                                component={RadioSelect}
                                fullWidth
                            />
                        </Grid>
                      </Grid>
                      <Divider variant="middle" />
                      <Grid container spacing={0}>
                        <Grid item xs={12} className={classes.box}>
                            <TextSmallDiv>Dates</TextSmallDiv>
                            <FieldArray 
                                validate={[ required ]}
                                name='dateOfPublish' 
                                label='date of publish'
                                component={renderListOfDates} 
                                /> 
                        </Grid>
                    </Grid>
                  </MuiThemeProvider>
                <div className={classes.buttondiv}>
                        <Button variant='contained' style={{ color: 'white', backgroundColor: 'darkorange' }} onClick={handleSubmit}>
                            Save Basic Info
                        </Button>
                </div>
            </div>
        );
}

      



const renderTitle = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <TextField
            {...input}
            id="standard-basic"
            style={{ width: '90%'}}
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
      </div>
    );
  };

  const renderDescription = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <TextField
            {...input}
            style={{ width: '90%'}}
            multiline
            rows={2}
            variant="outlined"
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
        </div>
    );
  };

  const renderBringBox = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <TextField
            {...input}
            id="standard-multiline-static"
            style={{ width: '90%'}}
            multiline
            rows={2}
            variant="outlined"
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
        </div>
    );
  };

  const renderPriceOfCourse = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <TextField
            {...input}
            id="outlined-number2"
            label='€'
            type="number"
            inputProps={{ min: "0", max: "5000", step: "1" }} 
            variant="outlined"
            style={{ color: 'darkorange' }}
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
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
        <Fab className={classes.buttonmargin} color='primary'  variant="extended" onClick={() => fields.push()}>
            <EditIcon className={classes.extendedIcon} />
            Edit Dates
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


function mapStateToProps(state, ownProps) {
    return {
      initialValues: {
        price: ownProps.price,
        title: ownProps.title, 
        description: ownProps.description, 
        isVirtual: ownProps.isVirtual,
        dateOfPublish: ownProps.dateOfPublish,
        location: ownProps.location,
        isPremium: ownProps.isPremium
      }
  }
}



export default connect(mapStateToProps)(reduxForm<{}, GenInfoProps>({
    form: 'GenInfo',
    validate
  })(GenInfo));