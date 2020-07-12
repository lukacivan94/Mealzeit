import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    eventdiv: {
        paddingTop: '10px',
        paddingBottom: '20px',
    },
    textdiv: {
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '30px',
        paddingTop: '5px',
        paddingBottom: '10px',
    },
    stylediv: {
        fontFamily: 'Source Sans Pro, sans-serif',
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px 50px 0px 50px',
    },
    textsmalldiv: {
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
        color: 'orange',
    },
    rowdiv: {
        paddingTop: '1px',
        width: '100%',
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
}));

const EventDiv = (props: any) => {
    const classes = useStyles();
    const { children } = props;
    return (
        <div className={classes.eventdiv}>
            {children}
        </div>
    );
}

const TextDiv = (props: any) => {
    const classes = useStyles();
    const { children } = props;
    return (
        <div className={classes.textdiv}>
            {children}
        </div>
    );
}

const StyleDiv = (props: any) => {
    const classes = useStyles();
    const { children } = props;
    return (
        <div className={classes.stylediv}>
            {children}
        </div>
    );
}

const TextSmallDiv = (props: any) => {
    const classes = useStyles();
    const { children } = props;
    return (
        <div className={classes.textsmalldiv}>
            {children}
        </div>
    );
}

const RowDiv = (props: any) => {
    const classes = useStyles();
    const { children } = props;
    return (
        <div className={classes.rowdiv}>
            {children}
        </div>
    );
}

const ButtonStyle = (props: any) => {
    const classes = useStyles();
    const { children } = props;
    return (
        <button className={classes.button}>
            {children}
        </button>
    );
}


export {EventDiv, TextDiv, StyleDiv, TextSmallDiv, RowDiv, ButtonStyle};