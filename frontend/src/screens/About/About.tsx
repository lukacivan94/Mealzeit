import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import Screen from '../../components/Screen/Screen';
import sabin from '../../assets/images/Team/sabin.png';
import ashish from '../../assets/images/Team/ashish.png';
import burak from '../../assets/images/Team/burak.png';
import ivan from '../../assets/images/Team/ivan.png';


/*
* Information about the Team displayed in about page 
*/

// Basic Styling of the all the components
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        margin: '20px 20px 0 20px',
    },
    wrapper: {
        padding: '20px',
        textAlign: 'center',
        alignItems: 'center',
        margin: '0 auto',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    big: {
        fontSize: '50px',
        paddingTop: '30px',
        paddingBottom: '5px',
    },
    small: {
        fontSize: '20px',
        paddingTop: '30px',
        paddingBottom: '30px',
    },
    text: {
        fontSize: '16px',
    },
    boxstyle: {
        display: 'flex',
        width: '160px',
        height: '160px',
        margin: '10px',
        border: '1px solid black',
        justifyContent: 'center',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));


export const About = () => {

    const classes = useStyles();

    return (
        <Screen>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.big}>Team </div>
                    <div className={classes.small}>We are a diverse team, with a passion for a sustainable future.</div>
                    <Grid container spacing={2}>
                        <Grid item xs={3} className={classes.box}>
                            <Avatar className={classes.boxstyle} src={sabin}/>
                            <div className={classes.text}>Bhandari Sabin</div>
                        </Grid>
                        <Grid item xs={3} className={classes.box}>
                            <Avatar className={classes.boxstyle} src={ashish}/>
                            <div className={classes.text}>Khanal Ashish</div>
                        </Grid>
                        <Grid item xs={3} className={classes.box}>
                            <Avatar className={classes.boxstyle} src={ivan}/>
                            <div className={classes.text}>Lukac Ivan</div>
                        </Grid>
                        <Grid item xs={3} className={classes.box}>
                            <Avatar className={classes.boxstyle} src={burak}/>
                            <div className={classes.text}>Tomruk Özcan Burak</div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Screen>
    );
};



export default About;