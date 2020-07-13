import React from 'react';
import BrowseCard from './Card';
import Burgers from '../../assets/images/burger.jpg';
import SampledEvents from './sampleEvents';
import invited from '../../assets/images/Invited/invited_by.png'
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'



// interface Props {
//     title: string;
//     id: string;
//     imageSource: string; 
//     Date: string;
//     Cuisine: String;
//     EventType: String;
//     Location : String;
//     FoodType: String;
//     MealType: String;
//     Size: Number;
//     invited:String;
//     Setting: string;
//     invitedText: string;
//     inviteeText: string;
//     name:string;
// };
export  function FriendCard() {

    return(
        <li>
            {
                SampledEvents.map(
                (val) => <BrowseCard key={val.eventId} id={val.eventId} imageSource={Burgers} title= "Burgers and fries at my place" Date = {val.Date.toDateString()}  Cuisine = {val.Cuisine} 
                EventType = {val.EventType} Location = {val.Location} FoodType = {val.FoodType} MealType = {val.MealType} Size = {val.Size} Setting = {val.Setting} 
                invited = {invited} invitedText = {val.invitedText} inviteeText = {val.inviteeText} name= "ivan"/>
                )
            }

        </li>
    )
};