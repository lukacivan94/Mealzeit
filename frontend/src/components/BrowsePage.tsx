import React, { Component } from 'react';
import Screen from './Screen/Screen';
//import Filters from './Browse/Filters';

import SampledEvents from './Browse/sampleEvents';
import MultipleSelect from './Browse/Filters';
import {FriendCard} from './Browse/CardList';
class Browse extends Component{ 
    render(){
        return(
            <Screen>
                <div className="Browse">
                    <div className="Browse-text_header">
                        What are you looking for? 
                    </div>
                    <div className="Browse-text_paragraph">
                        Whether you want to help or simplymeet someone- at Mealzeit you will find an event that fits you best
                    </div>
                    <MultipleSelect/>
                    
                    
                </div>
            </Screen>
        );
    }
}

export default Browse;

// const [selectedDate, setSelectedDate] = React.useState<Date | null>(
//     new Date(),
//   );
//   const [selectedEvent, setSelectedEvent] = React.useState<string | null>( "");

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };
//   const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedEvent(event.target.value);
//   }
//   const [values, setValues] = React.useState<State>({
//     numberformat: '4',
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value,
//     });
    
//   };