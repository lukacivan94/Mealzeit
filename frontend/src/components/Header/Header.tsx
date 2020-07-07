import React from 'react';
import styled from 'styled-components';
import { Logo } from '../Logo/Logo';
import { Profile } from '../Layout/Profile';
import mealZeitLogo from '../../assets/images/MealZeit_logo.png';
import profilePic from '../../assets/images/Profile_Pic.png';
import { Search, PlusCircle } from 'react-bootstrap-icons';

const StyledHeader = styled.header`
    height: 90px;
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

export const Header = () => {
    return (
        <StyledHeader>
            <Logo imageSource={mealZeitLogo} altText='MealZeit' />
            <StyledDiv>
               <Name>John Doe</Name>
                <Profile imageSource={profilePic} altText='ProfilePic' />
            </StyledDiv>
        </StyledHeader>
    );
};
/*  <StyledNav> <Search style={{ "paddingRight": '5px' }} /> Find an event </StyledNav>
                <StyledNav> <PlusCircle style={{ "paddingRight": '5px' }} /> Create an event </StyledNav>
                */