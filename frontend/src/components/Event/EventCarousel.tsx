import React, { Component } from 'react';
import styled from 'styled-components';
//import { Slider } from './Slider';

import Screen from '../Screen/Screen';
import EventMove from './EventMove';

const TextDiv= styled.div<{big: string}>`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: ${props => props.big ? "50px" : "18px"};
    padding-top: 30px;
    padding-bottom: ${props => props.big ? "5px" : "30px"};
`;

const inputBox= styled.input`
    font-family: 'Source Sans Pro', sans-serif;
    padding-top: 30px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: white;
  border-radius: 25px;
  width: 75%;
`;

class EventPage extends Component {
    render() {
        return (
            <Screen>
                <EventMove>
                    <TextDiv big>
                        Where are you planning your event?
                    </TextDiv>
                    <Input defaultValue="type your text" type="text" />
                    
                </EventMove>
    
            </Screen>
        );
    }
}

export default EventPage;