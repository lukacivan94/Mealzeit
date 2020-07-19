import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import StepperCookRoom from '../../components/Event/StepperCookRoom';

/*
* Load the Stepper for the Cookroom; this is the main point of entry for the cookroom page,
* a parent component.
*/

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