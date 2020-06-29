import React, { Component } from 'react';
import styled from 'styled-components';
import MaterialUIPickers from './assets/DateTime';

const TextDiv= styled.div`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 35px;
    padding-top: 20px;
    padding-bottom: 20px;
`;
const StyledDiv = styled.div`
    font-family: 'Source Sans Pro', sans-serif;
    padding: 0px 20px 70px 80px;
`;

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    background: white;
    border-radius: 25px;
    width: 75%;
    border: 1px solid grey;
    padding-left: 20px;
    :focus {
        outline: none;
    },
    ::placeholder {
        color: black;
        opacity: 0.8;
        padding-left: 20px;
      }
`;

class EventPage extends Component {
    render() {
        return (
            <StyledDiv>
                <TextDiv>
                    Where are you planning your event?
                </TextDiv>
                <Input placeholder="Type your address" type="text" />
                <TextDiv>
                    When are you planning your event?
                </TextDiv>
                <MaterialUIPickers />
            </StyledDiv>
        );
    }
}

export default EventPage;