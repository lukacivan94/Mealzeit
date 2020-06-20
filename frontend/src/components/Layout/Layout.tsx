import React from 'react';
import styled from 'styled-components';
import Background from '../../assets/images/Background.png';

const StyledMain = styled.main`
    margin-top: 500px;
    background-color: red;
    background-image: url(${Background});
`;

export const Layout = (props: any) => (
    <StyledMain>
        {props.children}
    </StyledMain>
);
