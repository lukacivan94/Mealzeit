import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { orange  } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { History, LocationState } from 'history';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import EventLocationTimeInput from './EventLocationTime/EventLocationTimeInput';
import { EventCreatedMessage } from './EventAdditionalInfo/EventCreatedMessage';
import JoinPageRoom from './EventMembers/JoinPageRoom';
import Menu from './EventRecipesSelection/Menu';
import MoreInfo from './EventAdditionalInfo/MoreInfo';
import axios from '../../axios';


// style defination for the cookroom layout
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'inline-block',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: '50px 50px 0 50px',
    alignItems: 'center',

  },
  wrapper: {
    padding: '30px',
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: '50px',
    margin: '0 auto',
    fontFamily: 'Source Sans Pro, sans-serif',
  },
  button: {
    marginRight: theme.spacing(4),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  margin: {
    width: '100%',
    justifyContent: 'center', 
    paddingBottom: '10px',
    alignItems: "center",
    display: 'flex',
  },
  stepIcon: {
    color: "pink"
  },
}));

// Overriding the default theme
const theme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        '&$completed': {
        color: 'LightGreen',
      },
        '&$active': {
          color: 'orange',
        },
      },
    },
  }
});

// Overriding the Button for desired color
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
}))(Button);



interface Props extends RouteComponentProps {
  userId: string;
  history: History<LocationState>;
}


  /** (✓)
   * This function handles four steps of the stepper to finish configuring cookroom
   */

const HorizontalLinearStepper =  (props: Props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [cookroomFirstStepValues, setCookroomFirstStepValues] = React.useState({
    location: String(),
    date_time: Date()
  });

  const [cookroomSecondStepValues, setCookroomSecondStepValues] = React.useState({
    invited_friends: [],
    number_of_members: Number(),
    instant_join: Boolean()
  });

  const [cookroomThirdStepValues, setCookroomThirdStepValues] = React.useState({
    recipe:  String()
  });

  const [cookroomFinalStepValues, setCookroomFinalStepValues] = React.useState({
    title:  String(),
    description:  String(),
    is_volunteering: Boolean(),
    required_items:  String(),
    suggested_price: Number()
  });

  const handleLocationDateSave = (values) => {
    const LocationDate = {
        location: values.location || '',
        date_time: values.dateOfPublish || '',
    };
    setCookroomFirstStepValues(LocationDate);
    handleNext();
  };

  const handleJoinMembers = (values) => {
    const JoinData = {
        invited_friends: values.invitedFriends || [],
        number_of_members: values.numberOfMembers || -1,
        instant_join: values.instantJoin || undefined,
    };
    console.log(cookroomFirstStepValues);
    setCookroomSecondStepValues(JoinData);
    handleNext();
  };

  const handleRecipeAdd = (values) => {
    const RecipeData = {
        recipe: values.recipe || '',
    };

    setCookroomThirdStepValues(RecipeData);
    handleNext();
  };

  const handleMoreInfo = (values) => {

    const userId = localStorage.getItem('userId');

    const MoreInfo = {
        title: values.title || '',
        description: values.description || '',
        is_volunteering: values.isVolunteering || undefined,
        required_items: values.requiredItems || '',
        suggested_price: values.suggestedPrice || -1,
    };
  
    setCookroomFinalStepValues(MoreInfo);

    const cookroomRequest = {
        location: cookroomFirstStepValues.location,
        date_time: cookroomFirstStepValues.date_time,
        invited_friends: cookroomSecondStepValues.invited_friends,
        number_of_members: cookroomSecondStepValues.number_of_members,
        instant_join: cookroomSecondStepValues.instant_join,
        recipe: cookroomThirdStepValues.recipe,
        title: values.title,
        description: values.description,
        is_volunteering: values.isVolunteering,
        required_items: values.requiredItems,
        suggested_price: values.suggestedPrice,
        userId: userId
    };
    
    axios.post('/cookrooms/', cookroomRequest)
        .then(res => {
            handleNext();
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            handleReset();
     });
  };

  //This function returns the name of the steps
  const getSteps = () => {
    return ['Select place and time', 'Members', 'Select Recipes', 'Additional information'];
  };

  const getStepContent = (step: number, handleBack) => {
    switch (step) {
      case 0:
        return (<EventLocationTimeInput onSubmit={handleLocationDateSave} handleBack={goToHome} course={ false }/>);
      case 1:
        return <JoinPageRoom onSubmit={handleJoinMembers} handleBack={handleBack} />;
      case 2:
        return <Menu onSubmit={handleRecipeAdd} handleBack={handleBack} />;
      case 3:
          return <MoreInfo onSubmit={handleMoreInfo} handleBack={handleBack} course={ false } />;
      default:
        return 'Unknown step';
    }
  };


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const goToHome = () => {
    props.history.push('/');
  };

  const steps = getSteps();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <MuiThemeProvider theme={theme}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Paper className={classes.instructions} elevation={0}>
                  <EventCreatedMessage />
                </Paper>
                <div className={classes.margin}>
                    <Button onClick={handleReset} variant="contained" className={classes.button}>Reset</Button>
                    <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={goToHome}>Home Page</Button>
                </div>
              </div>
            ) : (
              <div style={{paddingBottom: '50px'}}>
                  <Typography className={classes.instructions}  component={'div'} variant={'body2'}>{getStepContent(activeStep, handleBack)}</Typography>
                  <div className={classes.margin}>
                      <Button disabled={activeStep === 0} variant="contained" onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                      <ColorButton
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </ColorButton>
                  </div>
              </div>
            )}
          </div>
        </MuiThemeProvider>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId
});

export default connect(mapStateToProps)(withRouter(HorizontalLinearStepper));
