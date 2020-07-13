import React, { Component } from 'react';
import styled from 'styled-components';
import { Slider } from './Slider';

import Screen from '../Screen/Screen';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding-top: 115px;
    display: table;
    justify-content: space-between;
`
const StyledDiv = styled.div`
    position: absolute;
    background-color: red;
    align-items: center;
    width: 90%;
    height: 80%;
    margin-left: 100px;
`;

class EventPage extends Component {
    render() {
        return (
            <Screen>
                <Wrapper>
                    <Slider alignLeft='left'/>
                    <StyledDiv>
                        something
                    </StyledDiv>
                    <Slider alignLeft='right'/>
                </Wrapper>
            </Screen>
        );
    }
}

export default EventPage;