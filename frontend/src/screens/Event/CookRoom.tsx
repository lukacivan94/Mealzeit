import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import StepperCookRoom from '../../components/Event/StepperCookRoom';


class CookRoom extends Component {
    render() {
        return (
            <Screen>
                <StepperCookRoom></StepperCookRoom>
            </Screen>
        );
    }
}

export default CookRoom;