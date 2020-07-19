import React, { useEffect, useState} from 'react';
import axios from '../../axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardEvent from './CardEvent';

/*
* GridList: This component uses axios calls to get all the information of the user and then load it
* in the state as a list. When a component changes, the state also changes and connect to the backend
* via patch request to cancel/leave/edit an event.
*
*
* created/joined courses/cookrooms, created recipes and shared recipes all are loaded in the grid format
* and the information from backend is passed to the card.
*/


// Basic Styling specification of the all the components
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

// Interface specification for the exported component
interface Props {
  type: String;
  joined:Number;
}

// Interface specification for the declared constant
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


  // State specifications

  const [createdCookroomObjectList, setCreatedCookroomObjectList] = useState(cookroomArr);
  const [joinedCookroomObjectList, setJoinedCookroomObjectList] = useState(cookroomArr);

  const [createdCoursesObjectList, setCreatedCoursesObjectList] = useState(courseArr);
  const [joinedCoursesObjectList, setJoinedCoursesObjectList] = useState(courseArr);

  const [createdRecipeObjectList, setCreatedRecipeObjectList] = useState(recipeArr);
  const [sharedRecipeObjectList, setSharedRecipeObjectList] = useState(recipeArr);

  const userId = localStorage.getItem('userId');

  // When the component is mounted, axios calls is performed to get the information from backend
  
  const reloadCreatedCookroom = (data,reload) => {
    if(reload) {
      setCreatedCookroomObjectList(cookroomArr);
    }; 
    data['created_cookrooms'].map(
              val => {
                  axios.get("/cookrooms/"+val).then(response=> {
                    if(!response["data"]['cookroom']['is_cancelled']){
                      setCreatedCookroomObjectList(createdCookroomObjectList => [...createdCookroomObjectList,response["data"]['cookroom']] );                
                    }
            })}
          );
		
	};

	const reloadJoinedCookroom = (data) => {

    data['joined_cookrooms'].map(
	              val => {
	                  axios.get("/cookrooms/"+val).then(response=> {
	                    if(!response["data"]['cookroom']['is_cancelled']){
	                      setJoinedCookroomObjectList(joinedCookroomObjectList => [...joinedCookroomObjectList,response["data"]['cookroom']] );
	                    }
	            })}
	          );
	};
	const reloadCreatedCourse = (data,reload) => {
    if(reload) {
      setCreatedCoursesObjectList(courseArr);
    };
    data['created_courses'].map(
              val => {
                  axios.get("/courses/"+val).then(response=> {
                    if(!response["data"]['course']['is_cancelled']){
                      setCreatedCoursesObjectList(createdCoursesObjectList => [...createdCoursesObjectList,response["data"]['course']] );
                    }
                  })}
          	);
	};

	const reloadJoinedCourse = (data) => {
    data['joined_courses'].map(
              val => {
                  axios.get("/courses/"+val).then(response=> {
                    if(!response["data"]['course']['is_cancelled']){
                      setJoinedCoursesObjectList(joinedCoursesObjectList => [...joinedCoursesObjectList,response["data"]['course']] );
                    }
                    })}
          	);
	};
	const reloadCreatedRecipes = (data,reload) => {
    if(reload) {
      setCreatedRecipeObjectList(recipeArr);
    };

    data['created_recipes'].map(
        val => {
            axios.get("/recipes/"+val).then(response=> {
              if(!response["data"]['recipe']['is_cancelled']){
                setCreatedRecipeObjectList(createdRecipeObjectList => [...createdRecipeObjectList,response["data"]['recipe']] );
              }
              })}
    );

	};

	const reloadSharedRecipes = () => {
			axios.get("https://mealzeit-recipe-api.herokuapp.com/recipes").then(response => {
	          setSharedRecipeObjectList(response['data']['recipes'])
	      })
  };
  
  useEffect(() => {
    axios.get("/users/"+userId).then(response => {
      reloadCreatedCookroom(response["data"]['user'], 0);
      reloadJoinedCookroom(response["data"]['user']);
      reloadCreatedCourse(response["data"]['user'], 0);
      reloadJoinedCourse(response["data"]['user']);
      reloadCreatedRecipes(response["data"]['user'],0);
      reloadSharedRecipes();
		});
  },[]);

  // reload the page after the patch request passes through
  const handleReloadByType = (event_type) => {
    if(event_type === "cookrooms") {
      axios.get("/users/"+userId).then(response => {
        reloadCreatedCookroom(response["data"]['user'],1);
      })
    }
    if(event_type === "courses") {
      axios.get("/users/"+userId).then(response => {
        reloadCreatedCourse(response["data"]['user'],1);
      })
    }
    if(event_type === "recipes") {
      axios.get("/users/"+userId).then(response => {
        reloadCreatedRecipes(response["data"]['user'],1);
      })
    }

  };


  // cancelling or deleting calls for axios
  const handleCancelAndDelete =(type_room, type_id, event_joined) => {
      axios.patch(`/${type_room}/cancel/${type_id}/`)
          .then(res => {
              if(type_room == "cookrooms") {
                  setCreatedCookroomObjectList(createdCookroomObjectList.filter(item => item._id !== type_id));
              }
              if(type_room == "courses") {
                  setCreatedCoursesObjectList(createdCoursesObjectList.filter(item => item._id !== type_id));
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

  const handleLeaveCourse =(type_room, type_id, event_joined) => {
    axios.patch(`/${type_room}/leave/${type_id}/${userId}/`)
        .then(res => {
            if(type_room == "courses") {
                setJoinedCoursesObjectList(joinedCoursesObjectList.filter(item => item._id !== type_id));
            }     
            if(type_room == "cookrooms") {
              setJoinedCookroomObjectList(joinedCookroomObjectList.filter(item => item._id !== type_id)); 
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
                                      performCancelDelete={handleCancelAndDelete}
                                      reloadEvent={handleReloadByType}/>
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
                                      performCancelDelete={handleLeaveCourse}/>
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
                                      performCancelDelete={handleCancelAndDelete}
                                      reloadEvent={handleReloadByType}/>

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
                                      performCancelDelete={handleLeaveCourse}/>
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
                                      performCancelDelete={handleCancelAndDelete}
                                      reloadEvent={handleReloadByType}/>
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
                                      preparation_time={object.preparation_time}/>
                      </Grid>
                  )})
              :
              null
        }
        
      </Grid>
    </div>
  );
}