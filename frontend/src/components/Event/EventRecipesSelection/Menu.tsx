import React from 'react';
import { Field, reduxForm, FieldArray, InjectedFormProps, formValueSelector } from 'redux-form';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';


import LeftRightSlider from '../../ImageSlider/LeftRightSlider';
import AvatarImage from '../../AvatarProfile/AvatarImage';
import {ButtonStyle, StyleDiv, EventDiv, TextDiv, TextSmallDiv } from '../../Styling/TextStyle';
import TabBar from '../TabBar';
import Recipe from '../../../screens/Recipe/Recipe';
import { History, LocationState } from 'history';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';


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
}));

// const theme = createMuiTheme({
//     palette: {
//       primary: orange,
//     },
//   });
  
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
}

let recipesArrList : String[] = [];

const Menu = ({ isCourse, handleSubmit, handleBack }: MenuProps & InjectedFormProps<{}, MenuProps>) => {
        const classes = useStyles();

        const recipesArr : String[] = [];

        const [open, setOpen] = React.useState(false);
        const [recipiIdList, setRecipiIdList] = React.useState(recipesArr);
        const [recipiId, setRecipiId] = React.useState('');
        

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleSetRecipeId = (id) => {
            if(isCourse) {
                setRecipiIdList([...recipiIdList, id]);
                recipesArrList = recipiIdList;
            } else {
                setRecipiId(id);
                recipesArrList.push(id);
            }
            console.log(id);
        };


        function importAll(r) {
            return r.keys().map(r);
        };
        const listOfImages = importAll(require.context('../../../assets/images/profiles/', false, /\.(png|jpe?g|svg)$/));
        
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
                            <LeftRightSlider>
                                    
                                        {
                                        listOfImages.map(
                                            (image, index) =>  <AvatarImage key={index} src={image.default}/>
                                        )
                                        }
                                    
                            </LeftRightSlider>
                        </EventDiv>
                        <Divider variant="middle" />
                        <EventDiv>
                            <TextSmallDiv>Public Recipes</TextSmallDiv>
                            <LeftRightSlider>
                                    
                                        {
                                        listOfImages.map(
                                            (image, index) =>  <AvatarImage key={index} src={image.default}/>
                                        )
                                        }
                                    
                            </LeftRightSlider>
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
                                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                    </IconButton>
                                </Toolbar>
                                </AppBar>
                                {/* <Field
                                    name='recipe'
                                    component={renderRecipe}
                                    label='recipe'
                                    {...{
                                        handleClose: handleClose,
                                        handleSetRecipeId: handleSetRecipeId
                                    }}
                                /> */}
                                <Recipe history={history} modal={true} handleDialogClose={handleClose} handleSetRecipeId={handleSetRecipeId}/>
                            
                                {/* {
                                    isCourse
                                    ?
                                    <FieldArray 
                                        name='recipe' 
                                        label='recipe'
                                        component={renderListOfRecipes} 
                                        />        
                                    :
                                    <Field
                                        name='recipe'
                                        label='recipe'
                                        component={renderRecipe}
                                    />
                                    
                                } */}
                            
                            </Dialog>    
                            <Field 
                                name="recipe" 
                                component={renderField}
                                {...{
                                    recipesArrList: recipesArrList,
                                    isCourse: isCourse
                                }}
                            />
                        </EventDiv>
                    </StyleDiv>
                </TabBar>
                <div className={classes.buttondiv}>
                    <Button
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        Back
                    </Button>
                    <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleSubmit}>
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

// const renderRecipe = ({
//     label,
//     input,
//     meta: { touched, invalid, error },
//     type,
//     handleClose,
//     handleSetRecipeId,
//     ...custom
// }) => (
//         <Recipe 
//             {...input}
//             history={history} 
//             modal={true} 
//             handleDialogClose={handleClose} 
//             handleSetRecipeId={handleSetRecipeId}
//         />
//     );


// const renderRecipeInfo = ({
//         label,
//         input,
//         meta: { touched, invalid, error },
//         type,
//         handleClose,
//         handleSetRecipeId,
//         ...custom
//     }) => {
//     const classes = useStyles();
        
//     return (
//         <div className={classes.demo}>
//             <Divider variant="middle" />
//             <List dense>
//                 <ListItem>
//                   <ListItemText
//                     primary={props.name}
//                   />
//                   <ListItemSecondaryAction>
//                     <IconButton edge="end" aria-label="check">
//                       <CancelIcon className={classes.iconReject} />
//                     </IconButton>
//                   </ListItemSecondaryAction>
//                 </ListItem>
//             </List>
//         </div>
//         );
//     };


// const renderListOfRecipes = ({ fields, meta: { error } }) => {
    
//     const classes = useStyles();
//     return (
//     <div>
//         <MuiThemeProvider theme={theme}>
//         <Fab className={classes.margin} color='primary'  variant="extended" onClick={() => fields.push()}>
//             <AddIcon className={classes.extendedIcon} />
//             Add Date
//         </Fab>
//       </MuiThemeProvider>
//       {fields.map((date, index) => (

//         <div className={classes.demo}  key={index}>
//             <Divider variant="middle" />
//             <List dense>
//                 <ListItem>
//                     <Field
//                         validate={[ required ]}
//                         name={date}
//                         type="text"
//                         component={renderRecipe}
//                         label={`date #${index + 1}`}
//                     />
//                 <ListItemSecondaryAction>
//                     <IconButton edge="end" aria-label="check"  onClick={() => fields.remove(index)}>
//                         <DeleteIcon className={classes.iconReject} />
//                     </IconButton>
//                 </ListItemSecondaryAction>
//                 </ListItem>
//             </List>
//         </div>
//       ))}
//       <Divider variant="middle" />
//       {(error && <AlertMessage>{error}</AlertMessage>)}
//     </div>
//   );
// };


export default reduxForm<{}, MenuProps>({
    form: 'Menu',
})(Menu);

