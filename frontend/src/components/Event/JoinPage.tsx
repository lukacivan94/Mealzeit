import React, { Component } from 'react';
import styled from 'styled-components';
import Counter from './Counter';
import RadioSelect from './RadioSelect';

const Eventdiv= styled.div`
    padding-top: 10px;
    padding-bottom: 30px;
`;

const TextDiv= styled.div`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 35px;
    padding-top: 30px;
    padding-bottom: 20px;
`;
const StyledDiv = styled.div`
    font-family: 'Source Sans Pro', sans-serif;
    padding: 0px 20px 70px 80px;
`;

class EventCarousel extends Component {
    render() {
        return (
            <StyledDiv>
                <Eventdiv>
                    <TextDiv>
                        Make your event public?
                    </TextDiv>
                    <Counter />
                </Eventdiv>
                <Eventdiv>
                    <TextDiv>
                        Can people join instantly?
                    </TextDiv>
                    <RadioSelect />
                </Eventdiv>
            </StyledDiv>
        );
    }
}

export default EventCarousel;