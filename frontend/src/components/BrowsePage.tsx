import React, { Component } from 'react';
import Screen from './Screen/Screen';
import Filters from './Browse/Filters';
import {Cards} from './Browse/Cards';
import Burgers from '../assets/images/burger.jpg';
import SampledEvents from './Browse/sampleEvents';


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
                        {console.log("value printing")}
                        {console.log(SampledEvents[0].Location)}
                    </div>
                    
                    <li className = 'cards'>
                        {
                            SampledEvents.map(
                            (val) => <Cards key={val.eventId} id={val.eventId} imageSource={Burgers} text= "Burgers and fries at my place" Date = {val.Date}  Cuisine = {val.Cuisine} 
                            EventType = {val.EventType} Location = {val.Location} FoodType = {val.FoodType} MealType = {val.MealType} Size = {val.Size} Setting = {val.Setting} 
                            Invited = {val.Invited} Invitee = {val.Invitee} invitedText = {val.invitedText} inviteeText = {val.inviteeText}/>
                            )
                        }

                    </li>
                    
                </div>
            </Screen>
        );
    }
}

export default Browse;

