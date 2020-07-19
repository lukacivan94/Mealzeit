import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { TextField, 
        makeStyles, 
        InputLabel, 
        FormHelperText, 
        FormControl, 
        Button, 
        Snackbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GenInfoRecipe from './GenInfoRecipe';
import axios from '../../../axios';

/*
* Single Page View of Recipe when the edit button is pressed from profile page. 
* Created recipes can be edited, and this component is loaded in the dialog overlay model.
*/



// Basic Styling specification of the all the components
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    wrapper: {
        textAlign: 'center',
        alignItems: 'center',
        margin: '0 auto',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    big: {
        fontSize: '40px',
        paddingTop: '30px',
        paddingBottom: '5px',
    },
    small: {
        fontSize: '25px',
        paddingTop: '30px',
        paddingBottom: '5px',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    paper: {
        margin: theme.spacing(3),
        width: '100%',        
    },
    text: {
        margin: theme.spacing(5),
        fontStyle: 'italic',
        color: 'darkOrange',
    }
}));

// Interface specification for the exported default component and constants
interface RecipeProps {
    food_type: any
    _id: any
    recipe_title: any
    preparation_time: any
    instructions: any
    cuisine_type: any
    calorie_count: any
}

interface ChangedProps {
    propName: any,
    value: any
}

interface Props {
    handleDialogClose: any
    id: any
}




export const RecipeSPV = (props: Props) => {
    const classes = useStyles();

    const recipeInit: Array<RecipeProps> = [];
    const changedInit: Array<ChangedProps> = [];

    const [recipeState, setrecipeState] = useState(recipeInit);
    const [changedInfoState, setChangedInfoState] = useState(changedInit);


    const getUserInformation = () => {
        axios.get(`/recipes/${props.id}/`).then(res=> {
            if(!res["data"]['recipe']['is_cancelled']){
                setrecipeState([{
                    food_type: res['data']['recipe'].food_type,
                    _id: res['data']['recipe']._id,
                    recipe_title: res['data']['recipe'].recipe_title,
                    preparation_time: res['data']['recipe'].preparation_time,
                    instructions: res['data']['recipe'].instructions,
                    cuisine_type: res['data']['recipe'].cuisine_type,
                    calorie_count: res['data']['recipe'].calorie_count
                }]);                    
            }
        })
    }

    useEffect(() => getUserInformation() ,[]);

      const handleSaveBasicInfo = (values) => {
        const infoToPatch: Object[] = [];
        let changed =0;

        if(recipeState[0].recipe_title !== values.recipe_title) {
            infoToPatch.push({propName: "recipe_title", value: values.recipe_title});
            changed=1;
        };
        if(recipeState[0].preparation_time !== values.preparation_time) {
            infoToPatch.push({propName: "preparation_time", value: values.preparation_time});
            changed=1;
        };
        if(recipeState[0].instructions !== values.instructions) {
            infoToPatch.push({propName: "instructions", value: values.instructions});
        };
        if(recipeState[0].cuisine_type !== values.cuisine_type) {
            infoToPatch.push({propName: "cuisine_type", value: values.cuisine_type});
            changed = 1;
        };
        if(recipeState[0].calorie_count !== values.calorie_count) {
            infoToPatch.push({propName: "calorie_count", value: values.calorie_count});
            changed=1;
        };

        if(changed) {
            axios.patch(`/recipes/${props.id}`, infoToPatch)
            .then(res => {
                console.log("SUCCESS!!!!");
                props.handleDialogClose();
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        }
    };


    return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.big}>Recipe Edit View</div>
                    <Grid container>
                        <Grid item xs={12} className={classes.box}>
                            <Paper elevation={3} className={classes.paper}>
                            {
                                recipeState.map((object, index) => {
                                    return(
                                        <GenInfoRecipe 
                                            food_type={object.food_type}  
                                            recipe_title={object.recipe_title}
                                            instructions={object.instructions} 
                                            cuisine_type={object.cuisine_type}
                                            preparation_time={object.preparation_time}
                                            calorie_count={object.calorie_count}
                                            onSubmit={handleSaveBasicInfo}
                                            key={index}/>
                                    )})
                            }
                                
                                    
                                </Paper>
                        </Grid>
                    </Grid>
                </div>
                
            </div>
    );
};



export default RecipeSPV;