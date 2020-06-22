import * as React from 'react';
import { Component } from 'react';

class Browse extends Component{
    render(){

    }
    return(
        <div classname="Browse">
            <div classname="Browse-text_header">
                What are you looking for? 
            </div>
            <div classname="Browse-text_paragraph">
                Whether you want to help or simplymeet someone- at Mealzeit you will find an event that fits you best
            </div>
            <div classname ="Filters">
                <Button variant="primary" size="lg" active> Event Type </Button>{' '}
                <Button variant="primary" size="lg" active> Date </Button>
                <Button variant="primary" size="lg" active> Event Type </Button>{' '}
                <Button variant="primary" size="lg" active> Date </Button>
            
        </div>
    )
}