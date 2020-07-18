import React, { useEffect, useState} from 'react';
import axios from '../../../axios';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';

import AvatarImage from './FriendImage';
import Counter from './Counter';
import LeftRightSlider from '../../ImageSlider/LeftRightSlider';
import {StyleDiv, EventDiv, TextDiv } from '../../Styling/TextStyle';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
          marginTop: '30px',
        },
        counterroot: {
          display: 'flex',
          flexDirection: 'column',
          '& > *': {
            marginBottom: theme.spacing(2),
          }
        },
        countermargin: {
          justifyContent: 'center', 
          alignItems: "center",
          display: 'flex',
        },
        countersmall: {
            fontSize: '18px',
            color: 'orange',
            marginRight: theme.spacing(1),
            textTransform: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: 'transparent',
            },
        }
  }));


  const validate = values => {
    const errors = { numberOfMembers: '', instantJoin: '', invitedFriends:'' };
    const requiredFields = [
        'numberOfMembers',
        'instantJoin',
        'invitedFriends'
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
    handleSubmitValues?: any;
}

interface Provider {
  profile_picture: string,
  first_name: string,
  last_name: string,
  checked: boolean,
  _id: string,
}


const JoinPageRoom = ({ handleSubmit, handleBack, handleSubmitValues }: JoinPageProps & InjectedFormProps<{}, JoinPageProps>) => {
        const classes = useStyles();
        const obj : Array<Provider> = [];
        const acceptArr: Boolean[] = [];

        const joinstr: String = '';
        const numMem: Number = -1;


        const [FriendList, setFriendList] = useState(obj);
        const [friendIdList, setFriendIdList] = useState(acceptArr);
        const [numberOfMembers, setNumberOfMembers] = useState(numMem);
        const [instantJoin, setInstantJoin] = useState(joinstr);
        const [error, setError] = useState('');

    
        const userId = localStorage.getItem('userId');
        useEffect(() => {
          axios.get("/users/"+userId).then(response => {
              response["data"]['user']['friends'].map(
                  val => {
                      axios.get("/users/"+val).then(response=> {
                          setFriendList(FriendList => [...FriendList,{profile_picture: response["data"]['user']['profile_picture'] || '', first_name:response["data"]['user']['first_name'], last_name:response["data"]['user']['last_name'], _id:response["data"]['user']['_id'], checked:true}]);
                      })}
              );
          })
        },[]);
        const handleRemoveFriend = (id, name) => {
          setFriendIdList(friendIdList.filter(item => item !== id));
        };
        const handleAddFriend = (id, name) => {
            setFriendIdList(friendIdList=>[...friendIdList, id]);
        };  
        const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
          setNumberOfMembers(parseInt(event.target.value));
        };
        const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInstantJoin(event.target.value);
        };
        const handleSendValues = () => {
          handleSubmitValues({friendIdList:friendIdList, numberOfMembers:numberOfMembers, instantJoin:instantJoin});
      };           
        return (
          <div>
            <TabBar>
              <StyleDiv>
                  <EventDiv>
                      <TextDiv>
                          Who would you like to join?
                      </TextDiv>
                          <LeftRightSlider>
                              
                             
                                  {FriendList.map((object, index) => (
     
                                        <AvatarImage profile_picture={object.profile_picture}
                                                    first_name={object.first_name} 
                                                    last_name={object.last_name} 
                                                    _id={object._id}
                                                    key={index}
                                                    delId={handleRemoveFriend}
                                                    addId={handleAddFriend}
                                        />
                                ))}
                              
                          </LeftRightSlider>
                  </EventDiv>
                  <Divider variant="middle" />
                  <EventDiv>
                      <TextDiv>
                          Make your event public?
                      </TextDiv>
                      <div className={classes.counterroot}>
                        <div className={classes.countermargin}>
                              <Button size="small" className={classes.countersmall} disableRipple>Allow</Button>
                                  <TextField
                                      id="standard-number"
                                      type="number"
                                      error={!numberOfMembers}
                                      helperText={!numberOfMembers? 'Empty field!' : ' '}
                                      onChange={handleChangeText}  
                                      InputProps={{ inputProps: { min: 0, max: 100 } }}           
                                    />
                    
                              <Button size="small" className={classes.countersmall} disableRipple>people to join</Button>
                          </div>
                        </div>
                        {/* {touched && ((error && <AlertMessage>{error}</AlertMessage>))} */}
                  </EventDiv>
                  <Divider variant="middle" />
                  <EventDiv>
                      <TextDiv>
                          Can people join instantly?
                      </TextDiv>
                      <div>
                        <FormControl component="fieldset" className={classes.root}>
                          <RadioGroup row aria-label="position" name="position" defaultValue="top" className={classes.margin} onChange={handleChangeSelect}>
                            <FormControlLabel value="yes" control={<Radio style={{ color: 'darkorange' }} />} label='Yes' />
                            <FormControlLabel value="no" control={<Radio style={{ color: 'darkorange' }} />} label='No' />
                          </RadioGroup>
                        </FormControl>
                        {/* {touched && ((error && <AlertMessage>{error}</AlertMessage>))} */}
                        </div>
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
                    <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleSendValues}>
                        Next
                    </Button>
                </div>
          </div>
        );
};

  

  export default reduxForm<{}, JoinPageProps>({
    form: 'JoinPageRoom',
    validate,
  })(JoinPageRoom);