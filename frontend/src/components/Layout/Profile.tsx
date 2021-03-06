import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import InboxIcon from '@material-ui/icons/Inbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: 'transparent',
    height: '100%',
    marginRight: theme.spacing(2),
  },
  profile: {
    border: '1px solid red',
    width: theme.spacing(8),
    height: theme.spacing(8),
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
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
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface Props extends RouteComponentProps {
  imageSource: string;
  altText: string;
  logout();
}

const Profile = (props: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.logout();
    localStorage.removeItem('userId');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    props.history.push('/');
  };

  const handleProfile = () => {
    props.history.push('/profile');
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.profile} src={props.imageSource} alt={props.altText} aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} />
      <StyledMenu
        id='simple-menu-1'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <CancelIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

const mapDispatchToProps = {
  logout
};

export default connect(null, mapDispatchToProps)(withRouter(Profile));