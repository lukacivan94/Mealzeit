import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import StepperEvent from '../../components/Event/StepperEvent';


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