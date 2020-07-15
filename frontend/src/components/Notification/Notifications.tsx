import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import axios from '../../axios';
import { Divider, Badge } from '@material-ui/core';

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
                console.log('res: ', res);
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
                    notifications.map((notificationItem, index) => (
                        <>
                            <StyledMenuItem key={index}>
                                <ListItemIcon>
                                    <MailIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText primary={notificationItem.text} />
                            </StyledMenuItem>
                            <Divider variant='inset' component='li' />
                        </>
                    ))
                }
            </StyledMenu>
        </div>
    );
};

export default Notifications;