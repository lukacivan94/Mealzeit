import React, { useEffect, useState} from 'react';
import axios from '../../axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardEvent from './CardEvent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);
interface Props {
  type: String;
  joined:Number;
}

interface CookroomProvider {
  _id: any;
  members: any;
  date_time: any;
  title: any;
  number_of_members: any;
  requests?: any;
}

interface CourseProvider {
  _id: any;
  members: any;
  dates: any;
  title: any;
  number_of_members: any;
  requests?: any;
}

interface RecipeProvider {
  recipe_title: any;
  food_type: any;
  cuisine_type: any;
  preparation_time: any;
  _id: any;
}


export default function GridList(props: Props) {
  const classes = useStyles();


  const cookroomArr : Array<CookroomProvider> = [];
  const courseArr : Array<CourseProvider> = [];
  const recipeArr : Array<RecipeProvider> = [];
  const dates : String[] = [];
  // const coursesId : String[] = [];

  

  // const [createdCoursesIdList, //] = useState(coursesId);
  const [createdCookroomObjectList, setCreatedCookroomObjectList] = useState(cookroomArr);
  const [joinedCookroomObjectList, setJoinedCookroomObjectList] = useState(cookroomArr);

  const [createdCoursesObjectList, setCreatedCoursesObjectList] = useState(courseArr);
  const [joinedCoursesObjectList, setJoinedCoursesObjectList] = useState(courseArr);

  const [createdRecipeObjectList, setCreatedRecipeObjectList] = useState(recipeArr);
  const [sharedRecipeObjectList, setSharedRecipeObjectList] = useState(recipeArr);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
      axios.get("/users/"+userId).then(response => {
          //setCreatedCoursesIdList(response["data"]['user']['created_courses']);
          response["data"]['user']['created_courses'].map(
              val => {
                  axios.get("/courses/"+val).then(response=> {
                    if(!response["data"]['course']['is_cancelled']){
                      setCreatedCoursesObjectList(createdCoursesObjectList => [...createdCoursesObjectList,response["data"]['course']] );
                    }
                  })}
          );
          response["data"]['user']['joined_courses'].map(
              val => {
                  axios.get("/courses/"+val).then(response=> {
                    if(!response["data"]['course']['is_cancelled']){
                      setJoinedCoursesObjectList(joinedCoursesObjectList => [...joinedCoursesObjectList,response["data"]['course']] );
                    }
                    })}
          );
          response["data"]['user']['created_cookrooms'].map(
              val => {
                  axios.get("/cookrooms/"+val).then(response=> {
                    if(!response["data"]['cookroom']['is_cancelled']){
                      setCreatedCookroomObjectList(createdCookroomObjectList => [...createdCookroomObjectList,response["data"]['cookroom']] );                    
                    }
                    })}
          );
          response["data"]['user']['joined_cookrooms'].map(
              val => {
                  axios.get("/cookrooms/"+val).then(response=> {
                    if(!response["data"]['cookroom']['is_cancelled']){
                      setJoinedCookroomObjectList(joinedCookroomObjectList => [...joinedCookroomObjectList,response["data"]['cookroom']] );
                    }
                    })}
          );
          response["data"]['user']['created_recipes'].map(
              val => {
                  axios.get("/recipes/"+val).then(response=> {
                    if(!response["data"]['recipe']['is_cancelled']){

                      setCreatedRecipeObjectList(createdRecipeObjectList => [...createdRecipeObjectList,response["data"]['recipe']] );
                    }
                    })}
          );
      })
      axios.get("https://mealzeit-recipe-api.herokuapp.com/recipes").then(response => {
          setSharedRecipeObjectList(response['data']['recipes'])
      })
    },[]);

    const handleCancelAndDelete =(type_room, type_id, event_joined) => {
      axios.patch(`/${type_room}/cancel/${type_id}/`)
          .then(res => {
              if(type_room == "cookrooms") {
                if(event_joined) {
                  setJoinedCookroomObjectList(joinedCookroomObjectList.filter(item => item._id !== type_id));
                } else {
                  setCreatedCookroomObjectList(createdCookroomObjectList.filter(item => item._id !== type_id));
                }
              }
              if(type_room == "courses") {
                if(event_joined) {
                  setJoinedCoursesObjectList(joinedCoursesObjectList.filter(item => item._id !== type_id));
                } else {
                  setCreatedCoursesObjectList(createdCoursesObjectList.filter(item => item._id !== type_id));
                }
              }
              if(type_room == "recipes") {
                setCreatedRecipeObjectList(createdRecipeObjectList.filter(item => item._id !== type_id));
              }                  
          })
          .catch(error => {
              if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              }
          });
  };

    
 
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      {
              (props.type === "cookrooms" && !props.joined)
              ?
              createdCookroomObjectList.map((object, index) => {
                return(
                      <Grid item xs={6} key={index}>
                          <CardEvent type={props.type} 
                                      joined={props.joined} 
                                      member={object.members} 
                                      date={object.date_time} 
                                      title={object.title} 
                                      numberOfMembers={object.number_of_members} 
                                      request={object.requests}
                                      main_id={object._id}
                                      performCancelDelete={handleCancelAndDelete}/>
                      </Grid>
                  )})
              :
              null
        }
        {
              (props.type === "cookrooms" && props.joined)
              ?
              joinedCookroomObjectList.map((object, index) => {
                return(
                      <Grid item xs={6} key={index}>
                          <CardEvent type={props.type} 
                                      joined={props.joined} 
                                      member={object.members} 
                                      date={object.date_time} 
                                      title={object.title} 
                                      numberOfMembers={object.number_of_members}
                                      main_id={object._id}
                                      performCancelDelete={handleCancelAndDelete}/>
                      </Grid>
                  )})
              :
              null
        }
        {
              (props.type === "courses" && !props.joined)
              ?
              createdCoursesObjectList.map((object, index) => {
                return(
                      <Grid item xs={4} key={index}>
                          <CardEvent type={props.type} 
                                      joined={props.joined} 
                                      member={object.members} 
                                      date={object.dates} 
                                      title={object.title} 
                                      numberOfMembers={object.number_of_members}
                                      main_id={object._id}
                                      request={object.requests}
                            />
                      </Grid>
                  )})
              :
              null
        }
        {
              (props.type === "courses" && props.joined)
              ?
              joinedCoursesObjectList.map((object, index) => {
                return(
                      <Grid item xs={4} key={index}>
                          <CardEvent type={props.type} 
                                      joined={props.joined} 
                                      member={object.members} 
                                      date={object.dates} 
                                      title={object.title}
                                      main_id={object._id}
                                      numberOfMembers={object.number_of_members}
                            />
                      </Grid>
                  )})
              :
              null
        }
        {
              (props.type === "recipes" && !props.joined)
              ?
              createdRecipeObjectList.map((object, index) => {
                return(
                      <Grid item xs={4} key={index}>
                          <CardEvent type={props.type} 
                                      joined={props.joined}
                                      food_type={object.food_type} 
                                      cuisine_type={object.cuisine_type} 
                                      title={object.recipe_title}
                                      main_id={object._id}
                                      preparation_time={object.preparation_time}
                                      performCancelDelete={handleCancelAndDelete}/>
                      </Grid>
                  )})
              :
              null
        }
        {
              (props.type === "recipes" && props.joined)
              ?
              sharedRecipeObjectList.map((object, index) => {
                return(
                      <Grid item xs={4} key={index}>
                          <CardEvent type={props.type} 
                                      joined={props.joined}
                                      food_type={object.food_type} 
                                      cuisine_type={object.cuisine_type} 
                                      title={object.recipe_title}
                                      main_id={object._id}
                                      preparation_time={object.preparation_time}
                                      performCancelDelete={handleCancelAndDelete}/>
                      </Grid>
                  )})
              :
              null
        }
        
      </Grid>
    </div>
  );
}