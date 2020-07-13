import React from 'react';
import {StyleDiv, TextDiv, TextSmallDiv } from '../../Styling/TextStyle';

export const EventCreatedMessage = () => (
    <StyleDiv>
        <TextDiv>Congratulations!</TextDiv>
        <TextSmallDiv>Your event has been published!</TextSmallDiv>
        <TextSmallDiv>You will be notified when people join!</TextSmallDiv>
    </StyleDiv>
);