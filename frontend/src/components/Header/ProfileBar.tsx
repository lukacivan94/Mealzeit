import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Profile from '../Layout/Profile';
import profilePic from '../../assets/images/Profile_Pic.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        marginRight: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        paddingTop: theme.spacing(0.7)
    },
    name: {
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '18px',
        fontWeight: 'bold',
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    icon: {
        marginRight: theme.spacing(3)
    },
}));

export const ProfileBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <IconButton className={classes.icon} aria-label='show n new notifications' color='inherit'>
                <Badge badgeContent={17} color='secondary'>
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <div className={classes.name}>John Doreath</div>
            <Profile imageSource={profilePic} altText='ProfilePic' />
        </div>
    );
}