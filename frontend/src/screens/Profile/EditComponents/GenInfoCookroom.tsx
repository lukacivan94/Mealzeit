import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
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


/*
* Helper component to load data from Parent component for the cookrooms.
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
  }));

const required = value => value ? undefined : 'Required';
const Range = value => value && (Number(value) < 0 || Number(value)>5000) ? 'Invalid Price, enter from 0 to 5000!': undefined;

const validate = values => {
    const errors = { title:'', description:'', isVolunteering:'', requiredItems:'',suggestedPrice: '',  dateOfPublish: '', location: ''};
    const requiredFields = [
        'title',
        'description',
        'isVolunteering',
        'requiredItems',
        'suggestedPrice',
        'dateOfPublish',
        'location'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    if(+values.suggestedPrice){
      if(+values.suggestedPrice>5000 || +values.suggestedPrice<0) {
        errors.suggestedPrice = 'Invalid price entered';
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
    requiredItems: any
    suggestedPrice: any
    title: any
    description: any
    isVolunteering: any
    instant_join?: any
    number_of_members?: any
    dateOfPublish?: any
    location?: any
    key: any
}

const GenInfo = ({ requiredItems, suggestedPrice, title, description, isVolunteering,  handleSubmit }: GenInfoProps & InjectedFormProps<{}, GenInfoProps>) => {
      const classes = useStyles();      
      return (
          <div>
              <MuiThemeProvider theme={theme}>
                  <Grid container spacing={0}>
                        <Grid item xs={5} className={classes.box}>
                            <TextSmallDiv>Title</TextSmallDiv>
                            <Field
                                validate={[ required ]}
                                name='title'
                                component={renderTitle}
                                fullWidth
                            />
                        </Grid>
                        <Divider className={classes.divider} orientation="vertical" flexItem />
                        <Grid item xs={6} className={classes.box}>
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
                            <TextSmallDiv>Date</TextSmallDiv>
                            <Field
                                        validate={[ required ]}
                                        name='dateOfPublish'
                                        label='date of publish'
                                        component={renderDateTime}
                            />
                            
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />
                   
                    <Grid container>
                        <Grid item xs={3} className={classes.box}>
                          <TextSmallDiv>Volunteering </TextSmallDiv>
                          <Field
                              validate={[ required ]}
                              name='isVolunteering'
                              component={RadioSelect}
                          />
                        </Grid>
                        <Divider className={classes.divider}  orientation="vertical" flexItem />
                        <Grid item xs={3} className={classes.box}>
                          <TextSmallDiv>Price Split</TextSmallDiv>
                            <Field
                                validate={[ required, Range ]}
                                name='suggestedPrice'
                                component={renderSplitPrice}
                                fullWidth
                            />
                        </Grid>
                         <Divider className={classes.divider} orientation="vertical" flexItem />
                        <Grid item xs={5} className={classes.box}>
                        <TextSmallDiv>Required Items</TextSmallDiv>
                            <Field
                                validate={[ required ]}
                                name='requiredItems'
                                component={renderBringBox}
                                fullWidth
                            />
                        </Grid>
                      </Grid>
                      <Divider variant="middle" />
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

  const renderSplitPrice = ({
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
            id="outlined-number"
            label='€'
            type="number"
            inputProps={{ min: "0", max: "5000"}} 
            variant="outlined"
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


function mapStateToProps(state, ownProps) {
    return {
      initialValues: {
        requiredItems: ownProps.requiredItems,
        suggestedPrice: ownProps.suggestedPrice,
        title: ownProps.title, 
        description: ownProps.description, 
        isVolunteering: ownProps.isVolunteering,
        dateOfPublish: ownProps.dateOfPublish,
        location: ownProps.location
      }
  }
}


export default connect(mapStateToProps)(reduxForm<{}, GenInfoProps>({
    form: 'GenInfo',
    validate
  })(GenInfo));