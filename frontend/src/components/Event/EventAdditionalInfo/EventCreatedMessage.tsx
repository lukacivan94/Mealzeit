import React from 'react';
import {StyleDiv, TextDiv, TextSmallDiv } from '../../Styling/TextStyle';
import successIcon from '../../../assets/images/confirmed.jpg';
import styled from 'styled-components';

const StyledImg = styled.img`
    height: 50%;
`;

export const EventCreatedMessage = () => (
    <StyleDiv>
        <TextDiv>Congratulations!</TextDiv>
        <StyledImg src={successIcon} />
        <TextSmallDiv>Your event has been published!</TextSmallDiv>
        <TextSmallDiv>You will be notified when people join!</TextSmallDiv>
    </StyleDiv>
);