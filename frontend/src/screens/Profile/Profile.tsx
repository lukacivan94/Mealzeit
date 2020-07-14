import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Screen from '../../components/Screen/Screen';
import CustomizedTabs from './CustomizedTabs';
import GridList from './GridList';

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
        margin: '0px 30px 0px 60px',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    big: {
        fontSize: '40px',
        paddingTop: '30px',
        paddingBottom: '5px',
        textAlign: 'center',
        alignItems: 'center',
    },
    eventdiv: {
        paddingTop: '20px',
        paddingBottom: '20px',
        margin: '20px',
        borderRadius: '25px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 4px 22px -1px rgba(0,0,0,0.75)',
    },
}));



export const Profile = () => {
    const classes = useStyles();
    return (
        <Screen>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.big}>Ivan's Profile </div>
                    <div className={classes.eventdiv}>
                        <CustomizedTabs 
                            label1="Created Cookrooms" 
                            label2="Joined Cookrooms" 
                            left={<GridList type="cookroom" joined={0}/>} 
                            right={<GridList type="cookroom" joined={1}/>}/>
                    </div>
                    <div className={classes.eventdiv}>
                        <CustomizedTabs 
                                label1="Created Courses" 
                                label2="Joined Courses" 
                                left={<GridList type="course" joined={0}/>} 
                                right={<GridList type="course" joined={1}/>} />
                    </div>
                    <div className={classes.eventdiv}>
                        <CustomizedTabs 
                                label1="Created Recipes" 
                                label2="Shared With You" 
                                left={<GridList type="recipe" joined={0}/>} 
                                right={<GridList type="recipe" joined={1}/>} />
                    </div>
                </div>
            </div>
        </Screen>
    );
}

export default Profile;