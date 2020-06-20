import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.main`
    margin: 90px 0;
`;

export const Layout = (props: any) => (
    <StyledMain>
        {props.children}
    </StyledMain>
);
