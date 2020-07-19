import React, { useState, useEffect } from 'react';
import Screen from '../../components/Screen/Screen';
import {EventDiv, TextBigDiv, TextSmallDiv} from '../../components/Styling/TextStyle';
import MultipleSelect from '../../components/Browse/Filters';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../axios';

/** (✓)
 * This is the styles that used for this page
 */
const useStyles = makeStyles(() => ({
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


/** (✓)
 * This function is  our browse page and this is the parent component from where we render the filtered cards
 * In this function we retreive the data from backend and send the cookroom and couirses objects as props to the filtered components  to be filered 
 */
export const Browse = () => { 
    const classes = useStyles();

    const initials:Object[] =[] ;
    let coursesObject:Object[] = [] ;
    let cookroomsObject:Object[]= [];
   
    const rUrl = "https://mealzeit.herokuapp.com/recipes/"
    

    const[courses, setCourses] = useState(initials);
    const[cookrooms, setCookrooms] = useState(initials);
    
    
    useEffect(()=>{
        

        /** (✓)
         * This is a helper function that adds the several recipe components into the cookroom object
         */
        function addItems(original, ftype, ctype,ptime){
            original["food_type"] = ftype;
            original["cuisine_type"] = ctype;
            original["preparation_time"] = ptime
            return original;
        
        }
        /** (✓)
         * We make a n axios call to the backend and retrive all the courses by hitting the get courses route and retrive links to individual courses
         * And we then go through all the courses object and make another axios call to get all the infos of the individual courses like date, time location etc
         */
        axios.get("https://mealzeit.herokuapp.com/courses/")
            .then(response => {
                coursesObject = response["data"]["courses"]
                coursesObject.map( 
                    val =>{
                    axios.get(val["request"]["url"]).then(res=> {
                        setCourses(courses=>[...courses, res["data"]["course"]])
        
                    })
                    .catch(err => {
                        if (err.res) {
                            console.log(err.res.data);
                            console.log(err.res.status);
                            console.log(err.res.headers);
                        }
                })                       
            }) 
        })

         /** (✓)
         * We make a n axios call to the backend and retrive all the cookrooms by hitting the get cookrooms route and retrive links to individual cookrooms
         * And we then go through all the cookrooms object and make another axios call to get all the infos of the individual cookrooms like recipes, time location etc
         * And we again make another axios call to get infos from  recipes like food type, cuisine type and preparation time and we add it to the cookroom 
         * object using the helper function above. 
         */     

        
        axios.get("https://mealzeit.herokuapp.com/cookrooms/").then(response => {
        cookroomsObject = response["data"]["cookrooms"]
        cookroomsObject.map( 
            val =>{
            axios.get(val["request"]["url"]).then(res=> {
                let recipe = rUrl.concat(res["data"]["cookroom"]["recipe"])
                let incomplete_cookroom= res["data"]["cookroom"];
                console.log(res["data"]["cookroom"]["title"])
                    axios.get(recipe).then(resp=> {
                        let foodType=resp["data"]["recipe"]["food_type"]
                        let cuisine=resp["data"]["recipe"]["cuisine_type"]
                        let prepTime=resp["data"]["recipe"]["preparation_time"]
                        //setFoodType(foodType => resp["data"]["recipe"]["food_type"])
                        //setCuisine(cuisine =>resp["data"]["recipe"]["cuisine_type"])
                        setCookrooms(cookrooms => [...cookrooms,addItems(incomplete_cookroom,foodType,cuisine,prepTime)])       
                    })
                    .catch(err => {
                        if (err.resp) {
                            console.log(err.resp.data);
                            console.log(err.resp.status);
                            console.log(err.resp.headers);
                        }  
                
                     })
            
                })    
            })
             

    
        });

    
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
                          <MultipleSelect Courses= {courses} Cookrooms = {cookrooms} /> 
                        </EventDiv>
                        
                    </div>
                </div>
            </Screen>
        );
    
}

export default Browse;