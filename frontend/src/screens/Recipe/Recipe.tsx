import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RecipeForm from './RecipeForm';
import Screen from '../../components/Screen/Screen';
import axios from '../../axios';
import styled from 'styled-components';
import RecipeShareStep from './RecipeShareStep';
import { RecipeConfirmationStep } from './RecipeConfirmationStep';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        backButton: {
            marginRight: theme.spacing(1)
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    })
);

const getSteps = () => {
    return ['Select master blaster campaign settings', 'Create an ad group'];
};

const handleSaveRecipe = (values) => {
    const recipeData = {
        recipe_title: values.recipeTitle,
        food_type: values.foodType,
        cuisine_type: values.cuisineType,
        preparation_time: values.estimatedTime,
        instructions: values.instructions,
        calorie_count: '',
        ingredients: [],
        number_of_members: values.members,
        instant_join: values.instantJoin,
        description: values.description,
        is_public: values.isPublic
    };

    axios.post('/recipes/', recipeData)
        .then(res => {
            console.log('res: ', res);
        })
        .catch(err => {
            console.error('err: ', err);
        });
};

const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
        case 0:
            return (<RecipeForm onSubmit={handleSaveRecipe} />);
        case 1:
            return <RecipeShareStep />;
        default:
            return 'Unknown stepIndex';
    }
};

const StyledButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 100px;
`;

const Recipe = () => {
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
        <Screen>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <RecipeConfirmationStep />
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                <StyledButtonDiv>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </StyledButtonDiv>
                            </div>
                        )}
                </div>
            </div>
        </Screen>
    );
};

export default Recipe;