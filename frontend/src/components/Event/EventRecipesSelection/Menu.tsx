import React, { useEffect, useState} from 'react';
import axios from '../../../axios';
import { Field, reduxForm, FieldArray, InjectedFormProps } from 'redux-form';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';

import LeftRightSlider from '../../ImageSlider/LeftRightSlider';
import AvatarImage from '../../AvatarProfile/AvatarImage';
import {StyleDiv, EventDiv, TextDiv, TextSmallDiv } from '../../Styling/TextStyle';
import TabBar from '../TabBar';
import Recipe from '../../../screens/Recipe/Recipe';
import { History, LocationState } from 'history';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import Grid from '@material-ui/core/Grid';
import CardCourse from './RecipeCard';
import CardSharedOwn from './RecipeCardSharedOwn';


const useStyles = makeStyles((theme) => ({
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
      button: {
        background: '#F88805',
        color: 'white',
        fontSize: '1.3em',
        margin: '1.5em',
        padding: '0.5em 1em',
        border: '2px solid #F88805',
        borderRadius: '25px',
        outline: 'None',
    },
    appBar: {
        position: 'relative',
        backgroundColor: 'darkorange',
        marginBottom: '10px',
      },
    toolbar: {
        minHeight: 80,
      },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    iconReject: {
        fill: 'red',
    },
    extendedIcon: {
        marginRight: '3px',
    },
    margin: {
        marginBottom: theme.spacing(2),
    },
    gridroot: {
        flexGrow: 1,
      },
}));

  
// const required = value => value ? undefined : 'Required';

  
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

let history: History<LocationState>;
interface MenuProps {
    isCourse: boolean,
    handleBack();
    handleSetRecipeIdList?: any;
}

interface Provider {
    recipe_title: string,
    food_type: string,
    cuisine_type: string,
    preparation_time: string,
    _id: string,
}



const Menu = ({ isCourse, handleBack, handleSetRecipeIdList }: MenuProps & InjectedFormProps<{}, MenuProps>) => {
        const classes = useStyles();


        // -------------------------------------------------------------------------
        const obj : Array<Provider> = [];
        const acceptArr: Boolean[] = [];
   
        const [countRecipesCreated, setCountRecipesCreated] = useState(0);
        // const [countRecipesShared, setCountRecipesShared] = useState(0);

        const [createdRecipeObjectList, setCreatedRecipeObjectList] = useState(obj);
        const [sharedRecipeObjectList, setSharedRecipeObjectList] = useState(obj);

        const [acceptIcon, setAcceptIcon] = useState(acceptArr);
        const [acceptIconCourse, setAcceptIconCourse] = useState(acceptArr);
        const [allRecipeBool, setAllRecipeBool] = useState(acceptArr);
        const [searches, setSearch] = React.useState<string>("");

    
        const userId = localStorage.getItem('userId');
        //console.log(userId);
    
        useEffect(() => {
                axios.get("/users/"+userId).then(response => {
                    setAcceptIconCourse(Array(response["data"]['user']['created_recipes'].length).fill(true));
                    setCountRecipesCreated(response["data"]['user']['created_recipes'].length);
                    setAllRecipeBool(Array(response["data"]['user']['created_recipes'].length).fill(true))
                    response["data"]['user']['created_recipes'].map(
                        val => {
                            axios.get("/recipes/"+val).then(response=> {
                                setCreatedRecipeObjectList(createdRecipeObjectList => [...createdRecipeObjectList,response["data"]['recipe']]);

                            })}
                    );
                    axios.get("https://mealzeit-recipe-api.herokuapp.com/recipes").then(res => {
                        setSharedRecipeObjectList(res['data']['recipes']);
                        setAcceptIcon(Array(res['data']['count']).fill(true));
                        //setCountRecipes(countRecipes=>countRecipes+response['data']['count']);
                        setAllRecipeBool(allRecipeBool=>allRecipeBool.concat(Array(res['data']['count']).fill(true)));
                        //setCountRecipesShared(res["data"]['count']);
                    });
                })
          },[]);

        const handleRemoveRecipeID = (id, index) => {
            setRecipeId(recipeId.filter(item => item !== id));
            if(isCourse){
                setAllRecipeBool(allRecipeBool.map((item, id) => (id===index)? !item : item));
            } else {
                setAllRecipeBool(allRecipeBool.map(item => item=true));
                setAllRecipeBool(allRecipeBool.map((item, val) => (val===index)? !item : item));
            }
            
        };
        const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          };
        const handleAddRecipeID = (id, index) => {

            if(isCourse){
                setRecipeId(recipeId=>[...recipeId, id]);
                setAllRecipeBool(allRecipeBool.map((item, id) => (id===index)? !item : item));
            } else {
                setRecipeId([id]);
                //setAllRecipeBool(allRecipeBool.map(item => item=true));
                setAllRecipeBool(allRecipeBool.map((item, val) => (val===index)? !item : item=true));
            }
        };


        // -------------------------------------------------------------------------
        const recipesArr : String[] = [];
        const recipesInfo : Array<Provider> = [];// Object[] = [];

        const  filterTitle = (ftype) => ((ftype.recipe_title.toLowerCase().includes(searches.toLowerCase()))||(searches==""))
        
        const filteredRecipe = sharedRecipeObjectList.filter(filterTitle);
            
        const [open, setOpen] = useState(false);
        const [recipeId, setRecipeId] = useState(recipesArr);
        const [recipeIdInfo, setRecipeIdInfo] = useState(recipesInfo);
        

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            if(!isCourse) {
                setAllRecipeBool(allRecipeBool.map(item => true));
            };
            setOpen(false);
        };
        const handleCancel = () => {
            setOpen(false);
        };

        // send the recipe id list to the steppers:  Menu -> Stepper
        const handleSendRecipeId = () => {
            console.log(recipeId);
            handleSetRecipeIdList(recipeId);
        };

        // set recipe id comming from recipe.tsx:  Recipe -> Menu
        const handleSetRecipeId = (id) => {
            //setRecipeId(recipeId=>[...recipeId, id]);
            if(isCourse) {
                setRecipeId(recipeId=>[...recipeId, id]);
            } else {
                setRecipeId([id]);
            }

        };

        // set recipe information coming from recipe.tsx: Recipe -> Menu
        const handleRecipeInfo = (info) => {
            var newObj = JSON.parse(info);
            if(isCourse) {
                setRecipeIdInfo(recipeIdInfo=>[...recipeIdInfo, newObj]);
            } else {
                setRecipeIdInfo([newObj]);
            }
        };

        const handleRemoveItem = (index) => {
            setRecipeIdInfo(recipeIdInfo.filter((item, id) => id !== index));
            setRecipeId(recipeId.filter(item => recipeId.indexOf(item) !== index));
        };

        return (
            <div>
                <TabBar>
                    <StyleDiv>
                        <EventDiv>
                            <TextDiv>
                                What's on the Menu?
                            </TextDiv>
                        </EventDiv>
                        <Divider variant="middle" />
                        <EventDiv>
                            <TextSmallDiv>Your Recipes</TextSmallDiv>
                            <div className={classes.gridroot}>
                                <Grid container spacing={2}>
                                
                                        {createdRecipeObjectList.map((object, index) => (
                
                                                <Grid item xs={6}  key={index}>
                                                    <CardSharedOwn recipe_title={object.recipe_title} 
                                                                food_type={object.food_type} 
                                                                cuisine_type={object.cuisine_type} 
                                                                preparation_time={object.preparation_time}
                                                                index={index} 
                                                                deleteId={handleRemoveRecipeID}
                                                                addId={handleAddRecipeID}
                                                                accept={allRecipeBool[index]}
                                                                id={object._id}
                                                    />
                                                </Grid>
                                            ))}
                                </Grid>
                            </div>
                        </EventDiv>
                        <Divider variant="middle" />
                        <EventDiv>
                            <TextSmallDiv>Public Recipes</TextSmallDiv>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Search Public Recipe"
                                multiline
                                rowsMax={2}
                                value={searches}
                                onChange={handleChangeSearch}
                            />
                            <div className={classes.gridroot}>
                                <Grid container spacing={2}>
                                
                                        {filteredRecipe.map((object, index) => (
                
                                                <Grid item xs={6}  key={index}>
                                                    <CardSharedOwn recipe_title={object.recipe_title} 
                                                                food_type={object.food_type} 
                                                                cuisine_type={object.cuisine_type} 
                                                                preparation_time={object.preparation_time}
                                                                index={index+countRecipesCreated}
                                                                deleteId={handleRemoveRecipeID}
                                                                addId={handleAddRecipeID}
                                                                accept={allRecipeBool[index+countRecipesCreated]}
                                                                id={object._id}
                                                    />
                                                </Grid>
                                            ))}
                                </Grid>
                            </div>
                        </EventDiv>
                        <Divider variant="middle" />
                        <EventDiv>
                            <TextSmallDiv>Or ...</TextSmallDiv>
                            <button className={classes.button} onClick={handleClickOpen}>
                                    Create a Recipe
                            </button>
                            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                                <AppBar className={classes.appBar}>
                                <Toolbar className={classes.toolbar}>
                                    <IconButton edge="start" color="inherit" onClick={handleCancel} aria-label="close">
                                    <CloseIcon />
                                    </IconButton>
                                </Toolbar>
                                </AppBar>
                                <Recipe history={history} modal={true} handleDialogClose={handleClose} handleSetRecipeId={handleSetRecipeId} handleRecipeInfo={handleRecipeInfo}/>
                            
                            </Dialog>    
                        </EventDiv>
                        {
                                recipeIdInfo
                                ?
                        <div className={classes.gridroot}>
                            <Grid container spacing={2}>
                            
                                    {recipeIdInfo.map((object, index) => (
            
                                            <Grid item xs={6}  key={index}>
                                                <CardCourse recipe_title={object.recipe_title} 
                                                            food_type={object.food_type} 
                                                            cuisine_type={object.cuisine_type} 
                                                            preparation_time={object.preparation_time}
                                                            index={index}
                                                            delId={()=>handleRemoveItem(index)}
                                                />
                                            </Grid>
                                        ))}
                            </Grid>
                        </div>
                         :
                         null
                        }
                    </StyleDiv>
                </TabBar>
                <div className={classes.buttondiv}>
                    <Button
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        Back
                    </Button>
                    <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleSendRecipeId}>
                        Next
                    </Button>
                </div>
            </div>
        );
};

const renderField = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    recipesArrList,
    isCourse,
    ...custom
}) => {
    if(isCourse) {
        input.value = recipesArrList;
    } else {
        input.value = recipesArrList[0];
    }
    
    return (
        <div>
            {
                isCourse
                ?
                <ul>
                    {
                        recipesArrList.map(
                        (value, index) => <li key={index}>{value} </li>
                        )
                        
                    }
                </ul>
                :
                <span>
                    {recipesArrList[0]}
                </span>
            }
        </div>
    );
};


export default reduxForm<{}, MenuProps>({
    form: 'Menu',
})(Menu);

