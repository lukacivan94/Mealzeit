import React from 'react';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';

import AvatarImage from '../../AvatarProfile/AvatarImage';
import Counter from './Counter';
import LeftRightSlider from '../../ImageSlider/LeftRightSlider';
import {StyleDiv, EventDiv, TextDiv } from '../../Styling/TextStyle';

import { Button } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import AlertMessage from '../AlertMessage';
import TabBar from '../TabBar';

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
        },
  }));


  const validate = values => {
    const errors = { numberOfMembers: '', instantJoin: '' };
    const requiredFields = [
        'numberOfMembers',
        'instantJoin',
        //'invitedFriends'
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
    return errors;
};

const RangeMember = value => value && (Number(value) < 0 || Number(value)>30) ? 'Invalid number of members less than or equal to 30!' : undefined;
const required = value => value ? undefined : 'Required';

const RadioSelect = ({ input, touched, error, ...rest}) => {
    const classes = useStyles();

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

interface JoinPageProps {
    handleBack();
}

const JoinPageRoom = ({ handleSubmit, handleBack }: JoinPageProps & InjectedFormProps<{}, JoinPageProps>) => {
        const classes = useStyles();
        function importAll(r) {
            return r.keys().map(r);
        };
        const listOfImages = importAll(require.context('../../../assets/images/profiles/', false, /\.(png|jpe?g|svg)$/));
        
        return (
          <div>
            <TabBar>
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
                          name='numberOfMembers'
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
                          name='instantJoin'
                          component={RadioSelect}
                      />
                  </EventDiv>
              </StyleDiv>
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
  

  export default reduxForm<{}, JoinPageProps>({
    form: 'JoinPageRoom',
    validate,
  })(JoinPageRoom);