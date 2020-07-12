import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Screen from '../Screen/Screen';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        margin: '50px 50px 0 50px',
    },
    wrapper: {
        padding: '30px',
        //border: 'none',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '50px',
        margin: '0 auto',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    icon: {
        transform: 'translate(-10px, 5px)',
        padding: '2px',
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'column',
        justify: 'flex-start',
        alignItems: 'center',
    },
    button: {
        background: '#F88805',
        color: 'white',
        fontSize: '1.2em',
        margin: '0.6em',
        padding: '0.2em 1.5em',
        border: '1px solid #F88805',
        borderRadius: '25px',
        outline: 'none',
    },
    big: {
        fontSize: '50px',
        paddingTop: '30px',
        paddingBottom: '5px',
    },
    small: {
        fontSize: '18px',
        paddingTop: '30px',
        paddingBottom: '30px',
    },
    text: {
        paddingBottom: '4px',
    },
}));

export const HomePage = () => {
    const classes = useStyles();
    return (
        <Screen>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.big}>And who will you meet next? </div>
                    <div className={classes.small}>Whether you want to help or simply meet someone - at MealZeit you'll find an event that fits you best.</div>
                    <div className={classes.buttonRow}>
                        <button className={classes.button}><div className={classes.text}><SearchIcon className={classes.icon} />Find an event</div></button>
                        <button className={classes.button}><div className={classes.text}><EventNoteIcon className={classes.icon} />Create an event</div> </button>
                        <button className={classes.button}><div className={classes.text}><FastfoodOutlinedIcon className={classes.icon} />Create a recipe</div> </button>
                    </div>
                </div>
            </div>
        </Screen>
    );
}

export default HomePage;