import React from 'react';
import styled from 'styled-components';
import Table from '../Browse/Table'
import {XCircle, CheckCircle} from 'react-bootstrap-icons';

const StyledDiv = styled.div`
    position: relative;
    width: 700px;
    height: 250px;
    padding: 40px;
    margin : 50px;
    align: center;
    border-radius: 25px;
    border: 2px solid;
`;
const CardImage = styled.img`
  margin-left: 500px;
  position: absolute;
  width:200px;
  height: 150px;
  
`;
const CardTitle = styled.h1`
  font-size: 1.5em;
  color: palevioletred;
  position: absolute;
  color: black;  
  text-align: left;
  top:0;
`;
const CardInvited = styled.img`
  width: 40px;
  position: absolute;
  bottom: 60px;
  
`;
const CardInvitee = styled.img`
  position: absolute;
  width: 40px;
  bottom: 20px;
  
`;
const CardCrossButton = styled.div`
  position: absolute;
  right: 150px;
`;
const CardTickButton = styled.div`
  position: absolute;
  right: 50px;
`;
const CardTextInvited = styled.div`
  position: absolute;
  bottom: 70px;
  left:90px;

`;
const CardTextInvitee = styled.div`
  position: absolute;
  bottom: 30px;
  left:90px;

`;


interface Props {
    imageSource: string;
    text: string;
    Date: string;
    Cuisine: String;
    EventType: String;
    Location : String;
    FoodType: String;
    MealType: String;
    Size: Number;
    Setting: string;
    invitedBy:string;
    invitee:string;
    invitedText: string;
    inviteeText: string;
}
export const Cards = (props: Props) => (
    <StyledDiv>
        <CardImage src={props.imageSource}/>
        <CardTitle >{props.text} </CardTitle>
        <Table Date = {props.Date}  Cuisine = {props.Cuisine} EventType = {props.EventType} Location = {props.Location} FoodType = {props.FoodType} MealType = {props.MealType} Size = {props.Size} Setting = {props.Setting}/>
        <CardCrossButton>
          <XCircle size={60} color = "red"/>
        </CardCrossButton>
        <CardTickButton>
          <CheckCircle size={60} color = "green"/>
        </CardTickButton>
        <CardInvited src = {props.invitedBy}/>
        <CardInvitee src = {props.invitee}/>
        <CardTextInvited> {props.invitedText}</CardTextInvited>
        <CardTextInvitee> {props.inviteeText}</CardTextInvitee>


    </StyledDiv>
);

