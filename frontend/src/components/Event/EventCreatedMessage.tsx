import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 100%;
    font-family: 'Source Sans Pro', sans-serif;
    justify-content: center;
    text-align: center;
    padding-bottom: 30px;
`;

const BigTextDiv= styled.div`
    font-size: 35px;
    padding-top: 30px;
    padding-bottom: 30px;
`;

const SmallTextDiv= styled.div`
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
`;


export const EventCreatedMessage = () => (
    <StyledDiv>
        <BigTextDiv>Congratulations!</BigTextDiv>
        <SmallTextDiv>Your event has been published!</SmallTextDiv>
        <SmallTextDiv>You will be notified when people join!</SmallTextDiv>
    </StyledDiv>
);