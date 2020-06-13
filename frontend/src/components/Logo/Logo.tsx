import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    background-color: white;
    padding: 5px;
    height: 80%;
    box-sizing: border-box;
    border-radius: 10px;
`;

const StyledImage = styled.img`
    height: 100%;
`;

interface Props {
    imageSource: string;
    altText: string;
}

export const Logo = (props: Props) => (
    <StyledDiv>
        <StyledImage src={props.imageSource} alt={props.altText} />
    </StyledDiv>
);
