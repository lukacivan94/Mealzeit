import React, { useState, useEffect } from 'react';
import Screen from '../../components/Screen/Screen';
import {EventDiv, TextBigDiv, TextSmallDiv} from '../../components/Styling/TextStyle';
import MultipleSelect from '../../components/Browse/Filters';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

    
const getCookrooms = () => (
    axios.get("http://localhost:3000/cookrooms/").then(response => {
    const sampleCookRooms = response["data"]["cookrooms"]
    })
);

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        margin: '50px 50px 0 50px',
    },
    wrapper: {
        padding: '30px',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '50px',
        margin: '0 auto',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
}));

export const Browse = () => { 
    const classes = useStyles();
    const initials: Object[] =[] ;
    
    const[coursesObject, setCoursesObject] = useState([]);
    const[cookroomsObject, setCookroomsObject] = useState([]);
    const[courses, setCourses] = useState(initials);
    const[cookrooms, setCookrooms] = useState(initials);


    useEffect(()=>{
        axios.get("http://localhost:3000/courses/").then(response => {
        setCoursesObject(response["data"]["courses"])       
    }); 
        axios.get("http://localhost:3000/courses/").then(response => {
        setCookroomsObject(response["data"]["cookroom"])       
        });
        coursesObject.map(
            val => {
                axios.get(val["request"]["url"]).then(response=> {
                    setCourses([...courses, response["data"]])
                    console.log(courses)
                    
                })}
        
            );
        cookroomsObject.map(
            val => {
                axios.get(val["request"]["url"]).then(response=> {
                    setCourses([...cookrooms, response["data"]])

                    console.log(cookrooms)
                })}
        
            );
    
    
    },[]);
   

        return(
            <Screen>
                <div className={classes.root}>
                    <div className={classes.wrapper}>
                        <EventDiv>
                            <TextBigDiv>What are you looking for? </TextBigDiv>
                            <TextSmallDiv>
                                Whether you want to help or simply meet someone- at Mealzeit you will find an event that fits you the best!
                             </TextSmallDiv>

                        </EventDiv>
                        <EventDiv>
                            <MultipleSelect Courses= {courses} Cookrooms = {cookrooms}/>
                        </EventDiv>
                        
                    </div>
                </div>
            </Screen>
        );
    
}

export default Browse;