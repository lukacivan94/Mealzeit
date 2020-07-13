import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Logo } from '../Logo/Logo';
import mealZeitLogo from '../../assets/images/MealZeit_logo.png';
import { ProfileBar } from './ProfileBar';

import profilePic from '../../assets/images/Profile_Pic.png';
import { Search, PlusCircle } from 'react-bootstrap-icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { History, LocationState } from 'history';

const StyledDiv = styled.div`
    height: 100%;
    width: 45%;
    display: flex;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    justify-content: flex-end;
    align-items: center;
`;

const useStyles = makeStyles((theme) => ({
    main: {
        height: '75px',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        boxSizing: 'border-box',
        zIndex: 90,
        boxShadow: '0 4px 2px rgba(50, 50, 50, 0.4)',
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const StyledButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 100%;
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 50%;
    height: 30%;
    background-color: darkorange;
`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1)
        }
    })
);

interface Props {
    isLoggedIn: boolean;
    history: History<LocationState>;
}

const Header = (props: Props) => {
    const classes = useStyles();

    const goToLogin = () => {
        props.history.push('/sign-in');
    };

    const goToSignup = () => {
        props.history.push('/sign-up');
    };

    return (
        <header className={classes.main}>
            <Logo imageSource={mealZeitLogo} altText='MealZeit' />
            {props.isLoggedIn ?
                <StyledDiv>
                    <StyledNav> <Search style={{ 'paddingRight': '5px' }} /> Find an event </StyledNav>
                    <StyledNav> <PlusCircle style={{ 'paddingRight': '5px' }} /> Create an event </StyledNav>
                    <Name>John Doe</Name>
                    <Profile imageSource={profilePic} altText='ProfilePic' />
                </StyledDiv>
                :
                <StyledButtonDiv>
                    <StyledButton
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={goToLogin}
                    >
                        Log In
                  </StyledButton>
                    <StyledButton
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={goToSignup}
                    >
                        Sign Up
                  </StyledButton>
                </StyledButtonDiv>
            }
                    <ProfileBar />
        </header>
    );
};

export default Header;
