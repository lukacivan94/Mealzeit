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
    height: 90%;
    width: 100%;
`;

export const Layout = (props: any) => (
    <StyledMain>
        {props.children}
    </StyledMain>
);
