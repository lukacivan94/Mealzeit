import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundColor: '#F88805',
        borderTop: '1px solid #F88805',
        textAlign: 'center',
        padding: '12px',
        position: 'fixed',
        left: 0,
        bottom: 0,
        height: '5px',
        width: '100%',
        boxShadow: '0px -4px 3px rgba(50, 50, 50, 0.5)',
        display: 'flex',
        alignSelf: 'flex-start',
    },
    list: {
        color: 'white',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',    
        justifyContent: 'flex-start',
        paddingBottom: '10px',

    },
    item: {
        listStyleType: 'none',
    },
    link: {
        margin: '20px',
        paddingBottom: '20px',
        color: 'white',
        textDecoration: 'none',
        textAlign: 'center',
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
    <>
        <div className={classes.main}>
            <div className={classes.list}>
                <nav className={classes.item}><a className={classes.link} href='/'>About Us</a></nav>
                <nav className={classes.item}><a className={classes.link} href='/'>Help and Support</a></nav>
                <nav className={classes.item}><a className={classes.link} href='/'>Partnership</a></nav>
            </div>
        </div>
    </>
    );
}

export default Footer;