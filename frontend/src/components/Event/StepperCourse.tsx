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
import JoinPageCourse from './EventMembers/JoinPageCourse';
import Menu from './EventRecipesSelection/Menu';
import MoreInfo from './EventAdditionalInfo/MoreInfo';
import axios from '../../axios';



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



const HorizontalLinearStepper=  (props: Props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);


  const [courseFirstStepValues, setCourseFirstStepValues] = React.useState({
    location: String(),
    dates: Array()
  });

  const [courseSecondStepValues, setCourseSecondStepValues] = React.useState({
    price_of_course: Number(),
    number_of_members: Number(),
    is_included_in_premium: Boolean(),
    is_virtual: Boolean()
  });

  const [courseThirdStepValues, setCourseThirdStepValues] = React.useState({
    list_of_recipes: Array()
  });

  const [courseFinalStepValues, setCourseFinalStepValues] = React.useState({
    title:  String(),
    description:  String(),
    is_volunteering: Boolean(),
    required_items:  String(),
    suggested_price: Number()
  });

  const handleLocationDateSave = (values) => {
    let newDate = [];
    if(values.dateOfPublish){
      newDate = values.dateOfPublish.map(val => val.toISOString());
    }
    const LocationDate = {
        location: values.location || '',
        dates: newDate || [],
    };
    setCourseFirstStepValues(LocationDate);
    handleNext();
  };

  const handleJoinMembers = (values) => {
    console.log(courseFirstStepValues);
    const JoinData = {
        price_of_course: values.priceOfCourse || -1,
        number_of_members: values.numberOfMembers || -1,
        is_included_in_premium: values.isIncludedInPremium || undefined,
        is_virtual: values.isVirtual || undefined
    };
    setCourseSecondStepValues(JoinData);
    handleNext();
  };

  const handleRecipeAdd = (values) => {
    const RecipeData = {
      list_of_recipes: values.recipe || []
    };
    setCourseThirdStepValues(RecipeData);
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

    setCourseFinalStepValues(MoreInfo);

    const courseRequest = {
        location: courseFirstStepValues.location,
        dates: courseFirstStepValues.dates,
        price_of_course: courseSecondStepValues.price_of_course,
        number_of_members: courseSecondStepValues.number_of_members,
        is_included_in_premium: courseSecondStepValues.is_included_in_premium,
        is_virtual: courseSecondStepValues.is_virtual,
        list_of_recipes: courseThirdStepValues.list_of_recipes,
        title: values.title,
        description: values.description,
        is_volunteering: values.isVolunteering,
        required_items: values.requiredItems,
        suggested_price: values.suggestedPrice,
        userId: userId
    };
    
    axios.post('/courses/', courseRequest)
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


  const getSteps = () => {
    return ['Select place and time', 'Members', 'Select Recipes', 'Additional information'];
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <EventLocationTimeInput onSubmit={handleLocationDateSave} handleBack={goToHome} isCourse={ true }/>;
      case 1:
        return <JoinPageCourse onSubmit={handleJoinMembers} handleBack={handleBack}/>;
      case 2:
        return <Menu onSubmit={handleRecipeAdd} handleBack={handleBack} isCourse={ true }/>;
      case 3:
          return <MoreInfo onSubmit={handleMoreInfo} handleBack={handleBack} isCourse={ true } />;
      default:
        return 'Unknown step';
    }
  }
  

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
                <Button onClick={handleReset} variant="contained" className={classes.button}>
                  Reset
                </Button>
            </div>
          </div>
        ) : (
          <div style={{paddingBottom: '50px'}}>
            <Typography className={classes.instructions}  component={'div'} variant={'body2'}>{getStepContent(activeStep)}</Typography>
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
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId
});

export default connect(mapStateToProps)(withRouter(HorizontalLinearStepper));