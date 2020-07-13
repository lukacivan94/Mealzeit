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

import EventLocationTimeInput from './EventLocationTime/EventLocationTimeInput';
import { EventCreatedMessage } from './EventAdditionalInfo/EventCreatedMessage';
import JoinPageRoom from './EventMembers/JoinPageRoom';
import JoinPageCourse from './EventMembers/JoinPageCourse';
import Menu from './EventRecipesSelection/Menu';
import MoreInfo from './EventAdditionalInfo/MoreInfo';
import TabBar from './TabBar';

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

function getSteps() {
  return ['Select place and time', 'Members', 'Select Recipes', 'Additional information'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <TabBar><EventLocationTimeInput course={ false }/></TabBar>;
    case 1:
      return <TabBar><JoinPageRoom /></TabBar>;
    case 2:
      return <TabBar><Menu /></TabBar>;
    case 3:
        return <TabBar><MoreInfo course={ false } /></TabBar>;
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
