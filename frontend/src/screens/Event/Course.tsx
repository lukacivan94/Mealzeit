import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import StepperCourse from '../../components/Event/StepperCourse';


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