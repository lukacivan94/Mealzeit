import React, { useEffect } from 'react';
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

/** (✓)
 * These are material-ui styles for customizing material-ui components
 */
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
    input?: any;
    handleRecipeInfo?: any;
}

/** (✓)
 * This functional component handles recipe creation
 */

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

    const [selectedFriends, setSelectedFriends] = React.useState<string[]>([]);

    const [recipeSecondStepValues, setRecipeSecondStepValues] = React.useState({
        isPrivate: false
    });

    const [ingredients, setIngredients] = React.useState<Object[]>([]);

    const getSteps = () => {
        return ['Recipe Information', 'Sharing My Recipe'];
    };

    /** (✓)
     * This function saves values from redux form in first step of recipe form
     */
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

    /** (✓)
     * This function saves values from redux form in second step of recipe form
     * And calls axios post for recipe creation
     */
    const handleSaveRecipeShare = (values) => {
        const recipeData = {
            isPrivate: !!values.isPrivate
        };

        const userId = localStorage.getItem('userId');

        setRecipeSecondStepValues(recipeData);

        const recipeRequest = {
            recipe_title: recipeFirstStepValues.recipe_title,
            food_type: recipeFirstStepValues.food_type,
            cuisine_type: recipeFirstStepValues.cuisine_type,
            preparation_time: recipeFirstStepValues.preparation_time,
            instructions: recipeFirstStepValues.instructions,
            calorie_count: '',
            ingredients: ingredients,
            number_of_members: '',
            is_public: !values.isPrivate,
            userId: userId,
            shared_with_friends: selectedFriends
        };

        axios.post('/recipes/', recipeRequest)
            .then(res => {
                if (props.modal) {
                    props.handleSetRecipeId(res.data.recipeId);
                    props.handleRecipeInfo(res.config.data);
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

    /** (✓)
     * This function handles steps in stepper component
     */
    const getStepContent = (stepIndex: number, handleBack) => {
        switch (stepIndex) {
            case 0:
                return (<RecipeForm onSubmit={handleSaveRecipe} handleBack={goToHome} ingredients={ingredients} setIngredients={setIngredients} modal={props.modal}/>);
            case 1:
                return <RecipeShareStep onSubmit={handleSaveRecipeShare} handleBack={handleBack} selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends} />;
            default:
                return 'Unknown stepIndex';
        }
    };

    /** (✓)
     * This function increases step count to go next to step in stepper
     */
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    /** (✓)
     * This function decreases step count to go back to step in stepper
     */
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    /** (✓)
     * This function resets stepper 
     */
    const handleReset = () => {
        setActiveStep(0);
    };

    /** (✓)
     * This function navigates to home page
     */
    const goToHome = () => {
        props.history.push('/');
    };

    const steps = getSteps();

    /** (✓)
     * Return method consists of Recipe page inside Stepper
     */
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

/** (✓)
 * Recipe component uses redux connect to use actions and store 
 */
export default connect(mapStateToProps)(Recipe);