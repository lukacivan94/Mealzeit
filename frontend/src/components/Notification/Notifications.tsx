import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NotificationsIcon from '@material-ui/icons/Notifications';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import MailIcon from '@material-ui/icons/Mail';
import axios from '../../axios';
import { Divider, Badge, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        backgroundColor: 'transparent',
        height: '100%',
        marginRight: theme.spacing(2)
    },
    profile: {
        border: '1px solid red',
        width: theme.spacing(8),
        height: theme.spacing(8)
    }
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5'
    }
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: '#fcb562',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white
            }
        }
    }
}))(MenuItem);

const Notifications = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifications, setNotifications] = React.useState([]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        const userId = localStorage.getItem('userId');

        axios.get('/notifications/unread/' + userId)
            .then(res => {
                setNotifications(res.data.notifications);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    const handleClose = () => {
        setAnchorEl(null);
        setNotifications([]);
    };

    const handleAccept = (index) => {
        const selectedNot = notifications[index];
        const eventId = selectedNot.eventId;
        const memberId = selectedNot.memberId;
        const notId = selectedNot._id;

        axios.patch('/cookrooms/accreq/' + eventId + '/' + memberId)
            .then((res) => {
                updateNotification(notId);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    const updateNotification = (notId) => {
        axios.patch('/notifications/' + notId, [{ 'propName': 'is_read', 'value': true }])
            .then((res) => {
                setNotifications(notifications.filter((item) => item._id !== notId));
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    const handleReject = (index) => {
        const selectedNot = notifications[index];
        const eventId = selectedNot.eventId;
        const memberId = selectedNot.memberId;
        const notId = selectedNot._id;

        axios.patch('/cookrooms/rejectreq/' + eventId + '/' + memberId)
            .then((res) => {
                updateNotification(notId);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    return (
        <div className={classes.root}>
            <Badge badgeContent={notifications.length} color='secondary'>
                <NotificationsIcon onClick={handleClick} />
            </Badge>
            <StyledMenu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    notifications && notifications.length > 0 ? notifications.map((notificationItem, index) => (
                        <div key={index}>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <MailIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText primary={notificationItem.text} />
                                {notificationItem.type && notificationItem.type === 'request' ?
                                    <>
                                        <CheckIcon onClick={() => handleAccept(index)} style={{ color: 'green', margin: '10px' }} />
                                        <ClearIcon onClick={() => handleReject(index)} style={{ color: 'red', margin: '10px' }} />
                                    </>
                                    :
                                    <Button variant='text' style={{ color: 'darkorange' }} onClick={() => updateNotification(notificationItem._id)}>Mark as Read</Button>
                                }
                            </StyledMenuItem>
                            <Divider variant='inset' component='li' />
                        </div>
                    ))
                        :
                        <StyledMenuItem>
                            <ListItemText primary='You do not have any new notifications' />
                        </StyledMenuItem>
                }
            </StyledMenu>
        </div>
    );
};

export default Notifications;