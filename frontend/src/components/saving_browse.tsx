import React, { Component } from 'react';
import Screen from './Screen/Screen';
//import Filters from './Browse/Filters';

import SampledEvents from './Browse/sampleEvents';
import MultipleSelect from './Browse/Filters';
import {FriendCard} from './Browse/CardList';
class Browse extends Component{ 
    setSelectedEvent = (event) => {
        this.setState({ selectedEvent: event});
    }
    setSelectedDate = (event) => {
        this.setState({ selectedDate: event});
    }
    setSelectedCuisine = (event) => {
        this.setState({ selectedCuisine: event});
    }
    setSelectedSetting = (event) => {
        this.setState({ selectedSetting: event});
    }
    setSelectedMeals = (event) => {
        this.setState({ selectedMeals: event});
    }
    setSelectedFoodType = (event) => {
        this.setState({ selectedFoodType: event});
    }
    setTypedNumber = (event) => {
        this.setState({ typedNumber: event});
    }
    state = {selectedEvent: "", selectedDate:new Date(), selectedCuisine:"",selectedSetting:"",selectedMeals:"",selectedFoodType:"",typedNumber:0 };
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
                    <MultipleSelect selectedEvent={this.state.selectedEvent} setSelectedEvent = {this.setSelectedEvent} 
                                    setSelectedDate={this.setSelectedDate} selectedDate={this.state.selectedDate}                
                                    selectedCuisine={this.state.selectedCuisine} setSelectedCuisine = {this.setSelectedCuisine}
                                    selectedSetting={this.state.selectedSetting} setSelectedSetting = {this.setSelectedSetting}
                                    selectedMeals={this.state.selectedMeals} setSelectedMeals = {this.setSelectedMeals}
                                    selectedFoodType={this.state.selectedFoodType} setSelectedFoodType = {this.setSelectedFoodType} 
                                    typedNumber={this.state.typedNumber} setTypedNumber = {this.setTypedNumber} 
                                     
                    />
                    <FriendCard />
                    
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