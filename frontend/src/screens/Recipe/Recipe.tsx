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
import RecipeShareStep from './RecipeShareStep';
import { RecipeConfirmationStep } from './RecipeConfirmationStep';
import { connect } from 'react-redux';
import { History, LocationState } from 'history';

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
        },
        main: {
            height: '100%',
            width: '100%',
            display: 'inline-block',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
            margin: '50px 50px 0 50px'
        },
        wrapper: {
            padding: '30px',
            textAlign: 'center',
            alignItems: 'center',
            paddingTop: '50px',
            margin: '0 auto',
            fontFamily: 'Source Sans Pro, sans-serif'
        },
        buttondiv: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginRight: '100px'
        },
        confirmButtonDiv: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
);

interface Props {
    userId?: string;
    history: History<LocationState>;
    modal?: boolean;
    handleDialogClose?: any;
    handleSetRecipeId?: any;
}

const Recipe = (props: Props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [recipeFirstStepValues, setRecipeFirstStepValues] = React.useState({
        recipe_title: '',
        ingredients: '',
        food_type: '',
        cuisine_type: '',
        preparation_time: '',
        instructions: ''
    });

    const [recipeSecondStepValues, setRecipeSecondStepValues] = React.useState({
        isPrivate: false,
        message: ''
    });

    const getSteps = () => {
        return ['Recipe Information', 'Sharing My Recipe'];
    };

    const handleSaveRecipe = (values) => {

        const recipeData = {
            recipe_title: values.recipeTitle || '',
            ingredients: values.ingredients || '',
            food_type: values.foodType || '',
            cuisine_type: values.cuisineType || '',
            preparation_time: values.estimatedTime || '',
            instructions: values.instructions || ''
        };

        setRecipeFirstStepValues(recipeData);

        handleNext();
    };

    const handleSaveRecipeShare = (values) => {
        const recipeData = {
            isPrivate: !!values.isPrivate,
            message: values.message || ''
        };
        
        const userId = localStorage.getItem('userId');
        
        setRecipeSecondStepValues(recipeData);

        const userId = localStorage.getItem('userId');

        const recipeRequest = {
            recipe_title: recipeFirstStepValues.recipe_title,
            food_type: recipeFirstStepValues.food_type,
            cuisine_type: recipeFirstStepValues.cuisine_type,
            preparation_time: recipeFirstStepValues.preparation_time,
            instructions: recipeFirstStepValues.instructions,
            calorie_count: '',
            ingredients: [],
            number_of_members: '',
            instant_join: '',
            description: values.message || '',
            is_public: !values.isPrivate,
            userId: userId
        };

        axios.post('/recipes/', recipeRequest)
            .then(res => {
                if(props.modal) {
                    props.handleSetRecipeId(res.recipeId);
                }   
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

    const getStepContent = (stepIndex: number, handleBack) => {
        switch (stepIndex) {
            case 0:
                return (<RecipeForm onSubmit={handleSaveRecipe} handleBack={goToHome} />);
            case 1:
                return <RecipeShareStep onSubmit={handleSaveRecipeShare} handleBack={handleBack} />;
            default:
                return 'Unknown stepIndex';
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
        <Screen>
            <div className={classes.main}>
                <div className={classes.wrapper}>
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
                                    <div className={classes.confirmButtonDiv}>
                                        <Button onClick={handleReset}>Reset</Button>
                                        {
                                            props.modal
                                            ?
                                            <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={props.handleDialogClose}>Close</Button>
                                            :
                                            <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={goToHome}>Home Page</Button>
                                        }
                                        
                                    </div>
                                </div>
                            ) : (
                                    <div>
                                        <Typography className={classes.instructions}>{getStepContent(activeStep, handleBack)}</Typography>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </Screen>
    );
};

const mapStateToProps = (state) => ({
    userId: state.auth.userId
});

export default connect(mapStateToProps)(Recipe);