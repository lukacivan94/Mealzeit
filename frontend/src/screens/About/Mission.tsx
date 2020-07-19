import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Screen from '../../components/Screen/Screen';

/*
* Mission and Goal statement of MealZeit; what we stand for as a platform!
*/

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
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    paper: {
        marginTop: theme.spacing(10),
        width: theme.spacing(55),
        height: theme.spacing(20),
    },
    text: {
        margin: theme.spacing(5),
        fontStyle: 'italic',
        color: 'darkOrange',
    }
}));


export const MissionVision = () => {
    const classes = useStyles();


    return (
        <Screen>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.big}>Mission and Vision </div>
                    <Grid container>
                        <Grid item xs={6} className={classes.box}>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="body1" className={classes.text}>
                                "To Inspire and Augment the Meal Sharing Experience through Technology."
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} className={classes.box}>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="body1" className={classes.text}>
                                "To become the Go-To Platform for providing a variety of recipes and 
                                unexplored connections in fostering the growth of a healthy and sustainable 
                                food loving community."
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Screen>
    );
};



export default MissionVision;