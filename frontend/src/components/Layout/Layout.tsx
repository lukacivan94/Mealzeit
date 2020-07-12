import React from 'react';
import styled from 'styled-components';
import Background from '../../assets/images/Background.png';

const StyledMain = styled.main`
    background-image: url(${Background});
    background-repeat: non-repeat;
    background-size: cover;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    min-height: 625px;
    height: auto;
    width: 100%;
    margin-top: 100px;
    margin-bottom: 75px;
    padding: 20px 0;
`;

export const Layout = (props: any) => (
    <StyledMain>
        {props.children}
    </StyledMain>
);
