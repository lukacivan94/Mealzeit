import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { orange  } from '@material-ui/core/colors';

import EventCarousel from './EventCarousel';
import { EventCreatedMessage } from './EventCreatedMessage';
import JoinPage from './JoinPage';
import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    height: '60%',
    margin: '20px',
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
    paddingBottom: '50px',
    alignItems: "center",
    display: 'flex',
  }
}));

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
  return ['Select place and time', 'Create invites', 'Select Recipes', 'Additional information'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EventCarousel />;
    case 1:
      return <JoinPage />;
    case 2:
      return <Menu />;
    case 3:
        return "something is here!";
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
            <Typography className={classes.instructions}>
                <EventCreatedMessage />
            </Typography>
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
    </div>
  );
}
