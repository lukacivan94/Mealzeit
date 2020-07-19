import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import StepperCourse from '../../components/Event/StepperCourse';

/*
* Load the Stepper for the Recipe; this is the main point of entry for the Recipe page,
* a parent component.
*/
class Course extends Component {
    render() {
        return (
            <Screen>
                <StepperCourse></StepperCourse>
            </Screen>
        );
    }
}

export default Course;