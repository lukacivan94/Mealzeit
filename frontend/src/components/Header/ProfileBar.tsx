import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Profile from '../Layout/Profile';
import profilePic from '../../assets/images/Profile_Pic.png';
import { makeStyles } from '@material-ui/core/styles';
import Notifications from '../Notification/Notifications';
import { base64ToImage } from '../../utils/imageUtils';

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

export const ProfileBar = ({ user }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton className={classes.icon} aria-label='show n new notifications' color='inherit'>
                <Notifications />
            </IconButton>
            {user &&
                <div className={classes.name}>{user.first_name + ' ' + user.last_name}</div>

            }
            {user && user.profile_picture ?
                <Profile imageSource={`data:image/jpeg;base64,${user.profile_picture}`} altText='ProfilePic' />
                :
                <Profile imageSource={profilePic} altText='ProfilePic' />
            }
        </div>
    );
};