import React, { Component } from 'react';
import Screen from './Screen/Screen';
import Filters from './Browse/Filters';
import {Cards} from './Browse/Cards';
import Burgers from '../assets/images/burger.jpg';
import Invited from '../assets/images/invited_by.png';
import Invitee1 from '../assets/images/invitee.jpeg';
import Invitee from '../assets/images/invitee2.png';
import Invitee3 from '../assets/images/invitee3.png';



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
                    <Cards imageSource={Burgers} text= "Burgers and fries at my place" Date = " Monday 27th July" Cuisine = "Italian" 
                    EventType = "Get Together" Location = "StudentenStadt" FoodType = "Vegan" MealType = "Dinner" Size = {6} Setting = "Indoor" 
                    invitedBy = {Invited} invitee = {Invitee1} invitedText = "Invited By : Ashish" inviteeText = "1 person joined"/>
                    
                </div>
            </Screen>
        );
    }
}

export default Browse;

