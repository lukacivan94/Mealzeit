
import React, { Dispatch, SetStateAction } from 'react';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {TextSmallDiv, EventDiv } from '../../../components/Styling/TextStyle';

import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { TextField, Container, Typography, makeStyles, Select, InputLabel, FormHelperText, FormControl, Button, Snackbar } from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';



/*
* Helper component to load data from Parent component for the recipes.
* All the Fields are created with initialized values from the backend so that the user can
* view their old filled values and make changes accordingly.
*/


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: "center",
        '& > *': {
          marginLeft: theme.spacing(2),
        }
      },
      margin: {
        justifyContent: 'center', 
        alignItems: "center",
        display: 'flex',
        margin: '5px',
        padding: '5px',
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
        width: '100%',
        justifyContent: 'center', 
        paddingBottom: '10px',
        alignItems: "center",
        display: 'flex',
        marginTop: '30px',
      },
    box: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '10px',
    }, 
    divider: {
        padding: 0,
        margin: 0,
    },
}));

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

const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
  });



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


const validate = values => {
    const errors = { recipe_title: '', ingredients: '' };
    const requiredFields = [
        'recipe_title',
        'ingredients'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    return errors;
};


interface GenInfoRecipeProps {
    food_type: any
    recipe_title: any
    preparation_time:any
    instructions: any
    cuisine_type: any
    calorie_count: any
    key: any
}


const GenInfoRecipe = ({food_type, key, recipe_title, preparation_time, instructions, cuisine_type, calorie_count, handleSubmit }: GenInfoRecipeProps & InjectedFormProps<{}, GenInfoRecipeProps>) => {
      const classes = useStyles();      
      return (
          <div className={classes.root}>
                  <MuiThemeProvider theme={theme}>
         
                        <Grid container spacing={0} className={classes.margin}>
                                <Grid item xs={8} className={classes.box}>
                                    <TextSmallDiv>Title</TextSmallDiv>
                                        <Field
                                            name='recipe_title'
                                            component={renderTextField}
                                            label='Recipe Title'
                                            
                                        />
                                </Grid>
                            </Grid>
       
                  <Grid container spacing={0} className={classes.margin}>
                        <Grid item xs={5} className={classes.box}>
                            <TextSmallDiv>Estimated Time</TextSmallDiv>
                            <Field
                                name='preparation_time'
                                component={renderTextField}
                                label='Estimated Time'
                                type='numeric'
                                
                            />
                            
                        </Grid>
                 
                        <Grid item xs={6} className={classes.box}>
                            <TextSmallDiv>Instructions</TextSmallDiv>
                            <Field
                            name='instructions'
                            component={renderTextField}
                            label='Instructions'
                            
                            multiline
                            rows={2}
                            rowsMax={4}
                        />
                           
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />
                    <Grid container className={classes.margin}>
                        <Grid item xs={6} className={classes.box}>
                            <TextSmallDiv>Cuisine Type</TextSmallDiv>
                                <Field
                                name='cuisine_type'
                                component={renderSelectField}
                                label='Cuisine Type'
                                
                            >
                                {cuisineTypes.map((cuisine) => (
                                    <option value={cuisine.value}>{cuisine.text}</option>
                                ))
                                }
                            </Field>
                           
                            
                        </Grid>
                 
                        <Grid item xs={5} className={classes.box}>
                            <TextSmallDiv>Food Type</TextSmallDiv>
                                <Field
                                name='food_type'
                                component={renderSelectField}
                                label='Food Type'
                                
                            >
                                {foodTypes.map((food) => (
                                    <option value={food.value}>{food.text}</option>
                                ))
                                }
                            </Field>
                            
                            
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />
                  </MuiThemeProvider>
                <div className={classes.buttondiv}>
                        <Button variant='contained' style={{ color: 'white', backgroundColor: 'darkorange' }} onClick={handleSubmit}>
                            Save Basic Info
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
}) => (
        <TextField
            label={label}
            type={type}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
            style={{ width: '80%'}}
        />
    );

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>;
    }
};

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
        <FormControl style={{ width: '90%' }} error={touched && error}>
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




function mapStateToProps(state, ownProps) {
    return {
      initialValues: {
        food_type: ownProps.food_type,
        recipe_title: ownProps.recipe_title,
        preparation_time:ownProps.preparation_time,
        instructions: ownProps.instructions,
        cuisine_type: ownProps.cuisine_type,
        calorie_count: ownProps.calorie_count
      }
  }
}


export default connect(mapStateToProps)(reduxForm<{}, GenInfoRecipeProps>({
    form: 'GenInfoRecipe',
    validate
  })(GenInfoRecipe));