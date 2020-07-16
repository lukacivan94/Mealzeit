import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../axios';

import Screen from '../../components/Screen/Screen';
import CustomizedTabs from './CustomizedTabs';
import GridList from './GridList';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    wrapper: {
        margin: '0px 30px 0px 60px',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    big: {
        fontSize: '40px',
        paddingTop: '30px',
        paddingBottom: '5px',
        textAlign: 'center',
        alignItems: 'center',
    },
    eventdiv: {
        paddingTop: '20px',
        paddingBottom: '20px',
        margin: '20px',
        borderRadius: '25px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 4px 22px -1px rgba(0,0,0,0.75)',
    },
}));


export const Profile = () => {

    const obj : Object[] = [];
    // const coursesId : String[] = [];

    const classes = useStyles();
    const [user, setUser] = useState({});
    // const [createdCoursesIdList, setCreatedCoursesIdList] = useState(coursesId);
    const [createdCoursesObjectList, setCreatedCoursesObjectList] = useState(obj);
    const [joinedCoursesObjectList, setJoinedCoursesObjectList] = useState(obj);
    const [createdCookroomObjectList, setCreatedCookroomObjectList] = useState(obj);
    const [joinedCookroomObjectList, setJoinedCookroomObjectList] = useState(obj);
    const [createdRecipeObjectList, setCreatedRecipeObjectList] = useState(obj);
    // const [sharedRecipeObjectList, setSharedRecipeObjectList] = useState(obj);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get("/users/"+userId).then(response => {
            setUser(response["data"]['user']);
            // setCreatedCoursesIdList(response["data"]['user']['created_courses']);
            response["data"]['user']['created_courses'].map(
                val => {
                    axios.get("/courses/"+val).then(response=> {
                        setCreatedCoursesObjectList(createdCoursesObjectList => [...createdCoursesObjectList,response["data"]['course']] );
                        //console.log(response["data"]['course']);
                    })}
            );
            response["data"]['user']['joined_courses'].map(
                val => {
                    axios.get("/courses/"+val).then(response=> {
                        setJoinedCoursesObjectList(joinedCoursesObjectList => [...joinedCoursesObjectList,response["data"]['course']] );
                        //console.log(response["data"]['course']);
                    })}
            );
            response["data"]['user']['created_cookrooms'].map(
                val => {
                    axios.get("/cookrooms/"+val).then(response=> {
                        setCreatedCookroomObjectList(createdCookroomObjectList => [...createdCookroomObjectList,response["data"]['cookrooms']] );
                        //console.log(response["data"]['course']);
                    })}
            );
            response["data"]['user']['joined_cookrooms'].map(
                val => {
                    axios.get("/cookrooms/"+val).then(response=> {
                        setJoinedCookroomObjectList(joinedCookroomObjectList => [...joinedCookroomObjectList,response["data"]['cookrooms']] );
                        //console.log(response["data"]['course']);
                    })}
            );
            response["data"]['user']['created_recipes'].map(
                val => {
                    axios.get("/recipes/"+val).then(response=> {
                        setCreatedRecipeObjectList(createdRecipeObjectList => [...createdRecipeObjectList,response["data"]['recipes']] );
                        //console.log(response["data"]['course']);
                    })}
            );
            // response["data"]['user']['created_courses'].map(
            //     val => {
            //         axios.get("/courses/"+val).then(response=> {
            //             setSharedRecipeObjectList(sharedRecipeObjectList => [...sharedRecipeObjectList,response["data"]['course']] );
            //         })}
            // );
        }),
        axios.get("https://mealzeit-recipe-api.herokuapp.com/recipes").then(response => {
            console.log(response);
        })
      },[]);

      


    return (
        <Screen>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.big}>{user['first_name']}'s Profile </div>
                    <div className={classes.eventdiv}>
                        <CustomizedTabs 
                            label1="Created Cookrooms" 
                            label2="Joined Cookrooms" 
                            left={<GridList type="cookroom" joined={0} data={createdCoursesObjectList}/>} 
                            right={<GridList type="cookroom" joined={1} data={createdCoursesObjectList}/>}/>
                    </div>
                    <div className={classes.eventdiv}>
                        <CustomizedTabs 
                                label1="Created Courses" 
                                label2="Joined Courses" 
                                left={<GridList type="course" joined={0} data={createdCoursesObjectList}/>} 
                                right={<GridList type="course" joined={1} data={createdCoursesObjectList}/>} />
                    </div>
                    <div className={classes.eventdiv}>
                        <CustomizedTabs 
                                label1="Created Recipes" 
                                label2="Shared With You" 
                                left={<GridList type="recipe" joined={0} data={createdCoursesObjectList}/>} 
                                right={<GridList type="recipe" joined={1} data={createdCoursesObjectList}/>} />
                    </div>
                </div>
            </div>
        </Screen>
    );
}

export default Profile;