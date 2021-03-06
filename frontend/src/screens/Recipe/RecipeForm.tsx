import React, { Dispatch, SetStateAction } from 'react';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { TextField, Container, Typography, makeStyles, Select, InputLabel, FormHelperText, FormControl, Button, Snackbar } from '@material-ui/core';
import styled from 'styled-components';
import DatesList from '../../components/Event/EventLocationTime/DateTime/DatesList';
import { connect } from 'react-redux';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const cuisineTypes = [
    { value: '', text: '' },
    { value: 'american', text: 'American' },
    { value: 'european', text: 'European' },
    { value: 'asian', text: 'Asian' },
    { value: 'african', text: 'African' }
];

const foodTypes = [
    { value: '', text: '' },
    { value: 'vegan', text: 'Vegan' },
    { value: 'vegetarian', text: 'Vegetarian' },
    { value: 'meat based', text: 'Meat based' }
];

/** (✓)
 * This is for validation in redux form for recipe form
 */
const validate = values => {
    const errors = { recipeTitle: '', ingredients: '' };
    const requiredFields = [
        'recipeTitle',
        'ingredients'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    return errors;
};

/** (✓)
 * This is for validation ingredients field
 */
const validateIngredient = (value) => {
    return !value ? 'Required to add ingredient' : '';

};

/** (✓)
 * This is for error modal 
 */
const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
};

/** (✓)
 * This functional components is for rendering text field in redux form fields
 */
const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    style,
    ...custom
}) => (
        <TextField
            label={label}
            type={type}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            style={style}
            {...input}
            {...custom}
        />
    );

/** (✓)
 * This functional components is for rendering error messages in redux form fields
 */
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>;
    }
};

/** (✓)
 * This functional components is for rendering select field in redux form fields
 */
const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
        <FormControl style={{ width: '100%' }} error={touched && error}>
            <InputLabel>{label}</InputLabel>
            <Select
                {...input}
                {...custom}
            >
                {children}
            </Select>
            {renderFromHelper({ touched, error })}
        </FormControl>
    );

/** (✓)
 * This is for styling material-ui components
 */
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'unset'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'darkorange'
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    buttondiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}));

/** (✓)
 * These are styled components
 */
const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledFieldDiv = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledIngredientDiv = styled(StyledFieldDiv)`
    display: flex;
`;

interface RecipeProps {
    food: string;
    serving: string;
    ingredients: Object[];
    modal?: any;
    setIngredients: Dispatch<SetStateAction<Object[]>>;
    handleBack();
}

/** (✓)
 * This functional component is Redux Form for recipe page 
 */
const RecipeForm = ({ handleSubmit, handleBack, food, serving, change, setIngredients, ingredients, modal }: RecipeProps & InjectedFormProps<{}, RecipeProps>) => {
    const classes = useStyles();

    const [isWarningModalOpen, setWarningModal] = React.useState(false);

    /** (✓)
     * This methods handles deleting ids in ingredients
     */
    const handleDeleteId = (ids) => {
        setIngredients((ingredients) => ingredients.filter((chip?: any) => chip.key !== ids));
    };
    /** (✓)
     * This methods handles adding food and serving in ingredients
     */
    const handleIngredientAdd = () => {
        if (food && serving) {
            setIngredients((ingredients) => [...ingredients, { key: ingredients.length, label: food + ', ' + serving }]);
            change('food', null);
            change('serving', null);
        } else {
            setWarningModal(true);
        }
    };

    const handleWarningModalClose = () => {
        setWarningModal(false);
    };

    return (
        <Container component='main' maxWidth='xs'>
            <StyledDiv>
                <Typography component='h1' variant='h5' style={{ color: 'darkorange' }}>
                    Create A Recipe
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <StyledFieldDiv>
                        <Field
                            name='recipeTitle'
                            component={renderTextField}
                            label='Recipe Title'
                            fullWidth
                        />
                    </StyledFieldDiv>
                    <StyledIngredientDiv>
                        <Field
                            name='food'
                            component={renderTextField}
                            label='Food'
                            style={{ marginRight: '10px' }}
                        />
                        <Field
                            name='serving'
                            component={renderTextField}
                            label='Servings'
                            style={{ marginRight: '10px' }}
                        />
                        <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white', height: '50%', marginTop: '30px' }} onClick={handleIngredientAdd}>
                            ADD
                        </Button>
                        <Snackbar open={isWarningModalOpen} autoHideDuration={6000} onClose={handleWarningModalClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <Alert severity='error'>Food and Servings must be filled to add ingredient !</Alert>
                        </Snackbar>
                    </StyledIngredientDiv>
                    <StyledFieldDiv>
                        <DatesList dates={ingredients} id={handleDeleteId} />
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='estimatedTime'
                            component={renderTextField}
                            label='Estimated Time'
                            type='numeric'
                            fullWidth
                        />
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='instructions'
                            component={renderTextField}
                            label='Instructions'
                            fullWidth
                            multiline
                            rows={2}
                            rowsMax={4}
                        />
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='cuisineType'
                            component={renderSelectField}
                            label='Cuisine Type'
                            fullWidth
                        >
                            {cuisineTypes.map((cuisine) => (
                                <option value={cuisine.value}>{cuisine.text}</option>
                            ))
                            }
                        </Field>
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='foodType'
                            component={renderSelectField}
                            label='Food Type'
                            fullWidth
                        >
                            {foodTypes.map((food) => (
                                <option value={food.value}>{food.text}</option>
                            ))
                            }
                        </Field>
                    </StyledFieldDiv>
                </form>
                <div className={classes.buttondiv}>
                    {
                        modal
                        ?
                        null
                        :
                        <Button
                        onClick={handleBack}
                        className={classes.backButton}
                        >
                            RETURN
                        </Button>

                    }
                    
                    <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleSubmit}>
                        Next
                    </Button>
                </div>
            </StyledDiv>
        </Container>
    );
};

/** (✓)
 * This functional component is Redux Form for recipe page with validations 
 * Connect is used for reaching values in recipe redux form
 */
const selector = formValueSelector('recipeForm');

const mapStateToProps = (state) => ({
    food: selector(state, 'food'),
    serving: selector(state, 'serving')
});

export default connect(mapStateToProps)(
    reduxForm<{}, RecipeProps>({
        form: 'recipeForm',
        validate
    })(RecipeForm));