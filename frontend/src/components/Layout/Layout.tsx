import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.main`
    margin-top: 80px;
`;

export const Layout = (props: any) => (
    <StyledMain>
        {props.children}
    </StyledMain>
);
