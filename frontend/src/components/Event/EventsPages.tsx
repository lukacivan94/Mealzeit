import React, { Component } from 'react';
//import styled from 'styled-components';
import Screen from '../Screen/Screen';
import StepperEvent from './StepperEvent';


class EventPage extends Component {
    render() {
        return (
            <Screen>
                <StepperEvent></StepperEvent>
            </Screen>
        );
    }
}

export default EventPage;