import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { Button } from '@material-ui/core';

import { TextDiv, TextSmallDiv, RowDiv } from '../../Styling/TextStyle';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import AlertMessage from '../AlertMessage';
import TabBar from '../TabBar';


const useStyles = makeStyles((theme) => ({
    container: {
        fontFamily: 'Source Sans Pro, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    eventdiv: {
        paddingTop: '5px',
        paddingBottom: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
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
        },
  }));


  const validate = values => {
    const errors = { numberOfMembers: '', priceOfCourse: '' };
    const requiredFields = [
        'numberOfMembers',
        'isVirtual',
        'priceOfCourse',
        'isIncludedInPremium'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    if(+values.numberOfMembers){
      if(+values.numberOfMembers>30 || +values.numberOfMembers<0) {
        errors.numberOfMembers = 'Invalid number of people';
      }
    }
    if(+values.priceOfCourse){
      if(+values.priceOfCourse>5000 || +values.priceOfCourse<0) {
        errors.priceOfCourse = 'Invalid number of people';
      }
    }
    return errors;
};



const required = value => value ? undefined : 'Required';
const RangeMember = value => value && (Number(value) < 0 || Number(value)>30) ? 'Invalid number of members less than or equal to 30!' : undefined;
const RangePrice = value => value && (Number(value) < 0 || Number(value)>5000) ? 'Invalid Price, enter from 0 to 5000!': undefined;



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
  }


interface JoinPageProps {
    handleBack();
}


const JoinPageCourse = ({ handleSubmit, handleBack }: JoinPageProps & InjectedFormProps<{}, JoinPageProps>) => {
    const classes = useStyles();
        return (
          <div>
            <TabBar>
              <div className={classes.container}>
                      <TextDiv>
                          Participants Information
                      </TextDiv>
                  <div className={classes.eventdiv}>
                      <RowDiv>
                          <TextSmallDiv>set number of members</TextSmallDiv>
                          <Field
                              validate={[ required, RangeMember ]}
                              name='numberOfMembers'
                              component={renderNumberOfMembers}
                          />
                      </RowDiv>
                      <RowDiv>
                          <TextSmallDiv>Is this event virtual?</TextSmallDiv>
                          <Field
                            validate={[ required ]}
                              name='isVirtual'
                              component={RadioSelect}
                          />
                      </RowDiv>
                  </div>

                  <Divider variant="middle" />

                  <div className={classes.eventdiv}>
                      <RowDiv>
                          <TextSmallDiv>set the price</TextSmallDiv>
                          <Field
                              validate={[ required, RangePrice ]}
                              name='priceOfCourse'
                              component={renderPriceOfCourse}
                          />
                      </RowDiv>
                      <RowDiv>
                          <TextSmallDiv>Is this event included in premium?</TextSmallDiv>
                          <Field
                              validate={[ required ]}
                              name='isIncludedInPremium'
                              component={RadioSelect}
                          />
                      </RowDiv>
                  </div>
              </div>
            </TabBar>
              <div className={classes.buttondiv}>
                <Button
                    onClick={handleBack}
                    className={classes.backButton}
                >
                    Back
                </Button>
                <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleSubmit}>
                    Next
                </Button>
            </div>
          </div>
        );
};


const renderNumberOfMembers = ({
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
            id="outlined-number1"
            type="number"
            //defaultValue="0"
            inputProps={{ min: "0", max: "50", step: "1" }} 
            variant="outlined"
            style={{ color: 'darkorange' }}
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
            //defaultValue="0"
            inputProps={{ min: "0", max: "5000", step: "1" }} 
            variant="outlined"
            style={{ color: 'darkorange' }}
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
      </div>
    );
  };

  export default reduxForm<{}, JoinPageProps>({
    form: 'JoinPageCourse',
    validate,
  })(JoinPageCourse);
