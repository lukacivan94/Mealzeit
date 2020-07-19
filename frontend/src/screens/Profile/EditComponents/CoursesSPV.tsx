import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import GenCourseInfo from './GenCourseInfo';
import axios from '../../../axios';


/*
* Single Page View of course when the edit button is pressed from profile page. 
* Created courses can be edited, and this component is loaded in the dialog overlay model.
*/

// Basic Styling specification of the all the components
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
        textAlign: 'center',
        alignItems: 'center',
        margin: '0 auto',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    big: {
        fontSize: '40px',
        paddingTop: '30px',
        paddingBottom: '5px',
    },
    small: {
        fontSize: '25px',
        paddingTop: '30px',
        paddingBottom: '5px',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    paper: {
        margin: theme.spacing(3),
        width: '100%',        
    },
    text: {
        margin: theme.spacing(5),
        fontStyle: 'italic',
        color: 'darkOrange',
    }
}));


// Interface specification for the exported default component and constants
interface courseProps {
    _id: any
    title: any
    location: any
    description: any
    dates: any
    is_virtual: any
    price_of_course: any
    is_included_in_premium:any
}

interface Props {
    handleDialogClose: any
    id: any
}



export const courseSPV = (props: Props) => {
    const classes = useStyles();

    const courseInit: Array<courseProps> = [];

    const [courseState, setCourseState] = useState(courseInit);

    const getUserInformation = () => {
        axios.get(`/courses/${props.id}/`).then(res=> {
            if(!res["data"]['course']['is_cancelled']){
                setCourseState([{
                    _id: res['data']['course']._id,
                    title: res['data']['course'].title,
                    location: res['data']['course'].location,
                    description: res['data']['course'].description,
                    dates: res['data']['course'].dates,
                    price_of_course: res['data']['course'].price_of_course,
                    is_included_in_premium: res['data']['course'].is_included_in_premium,
                    is_virtual: res['data']['course'].is_virtual
                }]);                    
            }
        })
    }

    // When the component is mounted, axios calls is performed to get the information from backend
    useEffect(() => getUserInformation() ,[]);

      const handleSaveBasicInfo = (values) => {
        const virtual = Boolean(values.isVirtual =="yes");
        const premium = Boolean(values.isPremium =="yes");

        const infoToPatch: Object[] = [];
        let changed =0;

        if(courseState[0].title !== values.title) {
            infoToPatch.push({propName: "title", value: values.title});
            changed=1;
        };
        if(courseState[0].location !== values.location) {
            infoToPatch.push({propName: "location", value: values.location});
            changed=1;
        };
        if(courseState[0].description !== values.description) {
            infoToPatch.push({propName: "description", value: values.description});
        };
        if(courseState[0].dates !== values.dateOfPublish) {
            infoToPatch.push({propName: "dates", value: values.dateOfPublish});
            changed = 1;
        };
        if(courseState[0].is_virtual !== virtual) {
            infoToPatch.push({propName: "is_virtual", value: virtual});
            changed=1;
        };
        if(courseState[0].price_of_course !== values.price) {
            infoToPatch.push({propName: "price_of_course", value: values.price});
            changed=1;
        };
        if(courseState[0].is_included_in_premium !== premium) {
            infoToPatch.push({propName: "is_included_in_premium", value: premium});
            changed=1;
        };

        if(changed) {
            axios.patch(`/courses/${props.id}`, infoToPatch)
            .then(res => {
                props.handleDialogClose();
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        }
    };


    return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.big}>Course Edit View</div>
                    <Grid container>
                        <Grid item xs={12} className={classes.box}>
                            <Paper elevation={3} className={classes.paper}>
                            {
                                courseState.map((object, index) => {
                                    return(
                                        <GenCourseInfo 
                                            title={object.title}
                                            description={object.description} 
                                            dateOfPublish={object.dates}
                                            location={object.location}
                                            price={object.price_of_course}
                                            isVirtual={object.is_virtual ? "yes":"no"}
                                            isPremium={object.is_included_in_premium ? "yes":"no"}
                                            onSubmit={handleSaveBasicInfo}
                                            key={index}/>

                                    )})
                            }
                                </Paper>
                        </Grid>
                    </Grid>
                </div>
                
            </div>
    );
};



export default courseSPV;