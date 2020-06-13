import React from 'react';
import styled from 'styled-components';
import { Logo } from '../Logo/Logo';
import mealZeitLogo from '../../assets/images/logo.jpg';

const StyledHeader = styled.header`
    height: 80px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #F88805;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;
`;

const StyledNav = styled.nav`
    height: 100%;
`;

export const Header = () => {
    return (
        <StyledHeader>
            <Logo imageSource={mealZeitLogo} altText='MealZeit' />
            <StyledNav>
                ...
            </StyledNav>
            <div>
                Profile
            </div>
        </StyledHeader>
    );
};
