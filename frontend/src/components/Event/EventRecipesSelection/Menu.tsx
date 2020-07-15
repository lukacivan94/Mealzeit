import React from 'react';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
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
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';


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
}));


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

let history: History<LocationState>;
interface MenuProps {
    handleBack();
}

const Menu = ({ handleSubmit, handleBack }: MenuProps & InjectedFormProps<{}, MenuProps>) => {
        const classes = useStyles();

        const [open, setOpen] = React.useState(false);
        const [recipiId, setRecipiId] = React.useState('');

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleSetRecipeId = (id) => {
            setRecipiId(id);
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
                                <Field
                                    name='recipe'
                                    component={renderRecipe}
                                    label='recipe'
                                    {...{
                                        handleClose: handleClose,
                                        handleSetRecipeId: handleSetRecipeId
                                    }}
                                />
                            </Dialog>            
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

const renderRecipe = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    handleClose,
    handleSetRecipeId,
    ...custom
}) => (
        <Recipe 
            history={history} 
            modal={true} 
            handleDialogClose={handleClose} 
            handleSetRecipeId={handleSetRecipeId}
            {...input}
            {...custom}
        />
    );


export default reduxForm<{}, MenuProps>({
    form: 'Menu',
})(Menu);
