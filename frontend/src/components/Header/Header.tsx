import React from 'react';
import { Logo } from '../Logo/Logo';
import mealZeitLogo from '../../assets/images/MealZeit_logo.png';
import { ProfileBar } from './ProfileBar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { History, LocationState } from 'history';
import styled from 'styled-components';
import {ButtonStyle} from '../Styling/TextStyle';

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
    height: 50%;
    background-color: darkorange;
`;

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

                <ProfileBar />
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
        </header>
    );
};

export default Header;
