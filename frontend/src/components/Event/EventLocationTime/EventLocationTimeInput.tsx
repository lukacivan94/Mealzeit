import React from 'react';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';

import MaterialUIPickers from './DateTime/DateTime';
import SearchLocationInput from './Location/SearchLocationInput';
import { StyleDiv, EventDiv, TextDiv } from '../../Styling/TextStyle';


export default function EventLocationTimeInput({ course }) {
        return (
            <StyleDiv>
                <EventDiv>
                    <TextDiv>
                        Where are you planning your event?
                    </TextDiv>
                    <SearchLocationInput />
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextDiv>
                        When are you planning your event?
                    </TextDiv>
                    <MaterialUIPickers multiple={course}/>
                </EventDiv>
            </StyleDiv>
        );
};