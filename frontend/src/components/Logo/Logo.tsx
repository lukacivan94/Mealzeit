import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    background-color: transparent;
    padding: 2px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    float: left;
`;

const StyledImage = styled.img`
    height: 100%;
`;

const Title = styled.div`
    padding: 35px 20px;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 30px;
`;

interface Props {
    imageSource: string;
    altText: string;
}

export const Logo = (props: Props) => (
    <StyledDiv>
        <StyledImage src={props.imageSource} alt={props.altText} />
        <Title> MealZeit</Title>
    </StyledDiv>
);
