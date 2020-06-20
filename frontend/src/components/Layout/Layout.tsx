import React from 'react';
import styled from 'styled-components';
import Background from '../../assets/images/Background.png';

const StyledMain = styled.main`
    margin-top: 100px;
    background-image: url(${Background});
    background-size: cover;
    background-color: red;
    display: flex;
    align-items: center;
`;

export const Layout = (props: any) => (
    <StyledMain>
        {props.children}
    </StyledMain>
);
