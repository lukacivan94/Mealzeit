import React from 'react';
import styled from 'styled-components';
import Background from '../../assets/images/Background.png';

const StyledMain = styled.main`
    background-image: url(${Background});
    background-repeat: non-repeat;
    background-size: cover;
    background-color: transparent;
    display: flex;
    align-items: center;
    position: absolute;
    max-height: 85%;
    min-height: 42%;
    height: auto;
    width: 100%;
    width: 100%;
    margin-top: 9%;
    margin-bottom: 5%;
    padding: 15% 0%;
`;

export const Layout = (props: any) => (
    <StyledMain>
        {props.children}
    </StyledMain>
);
