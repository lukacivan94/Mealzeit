import React from 'react';
import styled from 'styled-components';
import { Logo } from '../Logo/Logo';
import { Profile } from '../Layout/Profile';
import mealZeitLogo from '../../assets/images/MealZeit_logo.png';
import profilePic from '../../assets/images/Profile_Pic.png';
import { Search, PlusCircle } from 'react-bootstrap-icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { History, LocationState } from 'history';

const StyledHeader = styled.header`
    height: 13%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    box-sizing: border-box;
    z-index: 90;
    box-shadow: 0 4px 2px rgba(50, 50, 50, 0.4);
    display: flex;
    justify-content: space-between;
`;
const StyledDiv = styled.div`
    height: 100%;
    width: 45%;
    display: flex;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    justify-content: flex-end;
    align-items: center;
`;

const StyledNav = styled.nav`
    border-radius: 5px;
    padding: 0;
    width: 100%;
`;
const Name = styled.span`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 18px;
    font-weight: bold;
    width: 100%;
`;

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
        <StyledHeader>
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
        </StyledHeader>
    );
};

export default Header;