import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Divider from '@material-ui/core/Divider';

import AvatarImage from '../../AvatarProfile/AvatarImage';
import Counter from './Counter';
//import RadioSelect from '../RadioSelect';
import LeftRightSlider from '../../ImageSlider/LeftRightSlider';
import {StyleDiv, EventDiv, TextDiv } from '../../Styling/TextStyle';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import AlertMessage from '../AlertMessage';

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
  }));


  const validate = values => {
    const errors = { numberPeople: '' };
    const requiredFields = [
        'numberPeople',
        'joinYN',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    if(+values.numberPeople){
      if(+values.numberPeople>30 || +values.numberPeople<0) {
        errors.numberPeople = 'Invalid number of people';
      }
  }
    return errors;
};

const RangeMember = value => value && (Number(value) < 0 || Number(value)>30) ? 'Invalid number of members less than or equal to 30!' : undefined;
const required = value => value ? undefined : 'Required';

const RadioSelect = ({ input, touched, error, ...rest}) => {
    const classes = useStyles();
    //const {label1, label2} = props;
    return (
      <div>
      <FormControl component="fieldset" className={classes.root}>
        <RadioGroup row aria-label="position" name="position" defaultValue="top" className={classes.margin} {...input}{...rest}>
          <FormControlLabel value="yes" control={<Radio style={{ color: 'darkorange' }} />} label='Yes' />
          <FormControlLabel value="no" control={<Radio style={{ color: 'darkorange' }} />} label='No' />
        </RadioGroup>
      </FormControl>
      {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
      </div>
    );
  }


const JoinPageRoom = () => {
        function importAll(r) {
            return r.keys().map(r);
        };
        const listOfImages = importAll(require.context('../../../assets/images/profiles/', false, /\.(png|jpe?g|svg)$/));

        return (
            <StyleDiv>
                <EventDiv>
                    <TextDiv>
                        Who would you like to join?
                    </TextDiv>
                        <LeftRightSlider>
                            
                                {
                                listOfImages.map(
                                    (image, index) =>  <AvatarImage key={index} src={image.default}/>
                                )
                                }
                            
                        </LeftRightSlider>
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextDiv>
                        Make your event public?
                    </TextDiv>
                    <Field
                        validate={[ required, RangeMember ]}
                        name='numberPeople'
                        component={renderTextField}
                    />
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextDiv>
                        Can people join instantly?
                    </TextDiv>
                    <Field
                        validate={[ required, RangeMember ]}
                        name='joinYN'
                        component={RadioSelect}
                    />
                </EventDiv>
            </StyleDiv>
        );
};

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <Counter
        {...input}
        {...custom}      
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
      </div>
    );
  };
  




  export default reduxForm({
    form: 'JoinPageRoom',
    validate,
  })(JoinPageRoom);