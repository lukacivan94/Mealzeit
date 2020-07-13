import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { Field, reduxForm } from 'redux-form';
import { orange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

//import RadioSelect from '../RadioSelect';
import { TextDiv, TextSmallDiv, RowDiv } from '../../Styling/TextStyle';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import AlertMessage from '../AlertMessage';


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
  }));


  const validate = values => {
    const errors = { setMember: '', setPrice: '' };
    const requiredFields = [
        'setMember',
        'virtualSelect',
        'setPrice',
        'premiumSelect'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    if(+values.setMember){
      if(+values.setMember>30 || +values.setMember<0) {
        errors.setMember = 'Invalid number of people';
      }
    }
    if(+values.setPrice){
      if(+values.setPrice>5000 || +values.setPrice<0) {
        errors.setPrice = 'Invalid number of people';
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



const JoinPageCourse = () => {
    const classes = useStyles();
        return (
            <div className={classes.container}>
                    <TextDiv>
                        Participants Information
                    </TextDiv>
                <div className={classes.eventdiv}>
                    <RowDiv>
                        <TextSmallDiv>set number of members</TextSmallDiv>
                        <Field
                            validate={[ required, RangeMember ]}
                            name='setMember'
                            component={renderSetMembers}
                        />
                    </RowDiv>
                    <RowDiv>
                        <TextSmallDiv>Is this event virtual?</TextSmallDiv>
                        <Field
                          validate={[ required ]}
                            name='virtualSelect'
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
                            name='setPrice'
                            component={renderSetPrice}
                        />
                    </RowDiv>
                    <RowDiv>
                        <TextSmallDiv>Is this event included in premium?</TextSmallDiv>
                        <Field
                            validate={[ required ]}
                            name='premiumSelect'
                            component={RadioSelect}
                        />
                    </RowDiv>
                </div>
            </div>
        );
};


const renderSetMembers = ({
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
            defaultValue="0"
            inputProps={{ min: "0", max: "50", step: "1" }} 
            variant="outlined"
            style={{ color: 'darkorange' }}
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
      </div>
    );
  };


const renderSetPrice = ({
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
            defaultValue="0"
            inputProps={{ min: "0", max: "5000", step: "1" }} 
            variant="outlined"
            style={{ color: 'darkorange' }}
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
      </div>
    );
  };

  

  export default reduxForm({
    form: 'JoinPageCourse',
    validate,
  })(JoinPageCourse);
