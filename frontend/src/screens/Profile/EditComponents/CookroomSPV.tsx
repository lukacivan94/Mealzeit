import React, { useState, useEffect } from 'react';
import { makeStyles,  } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GenInfo from './GenInfoCookroom';

import axios from '../../../axios';

/*
* Single Page View of cookroom when the edit button is pressed from profile page. 
* Created cookrooms can be edited, and this component is loaded in the dialog overlay model.
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
interface CookroomProps {
    number_of_members: any
    invited_friends: any
    required_items: any
    suggested_price: any
    _id: any
    title: any
    location: any
    description: any
    date_time: any
    recipe: any
    instant_join: any
    is_volunteering: any
}

interface Props {
    handleDialogClose: any
    id: any
}




export const CookroomSPV = (props: Props) => {
    const classes = useStyles();
    const cooroomInit: Array<CookroomProps> = [];
    
    // State specifications
    const [cookroomState, setCookroomState] = useState(cooroomInit);


    const getUserInformation = () => {
        axios.get(`/cookrooms/${props.id}/`).then(res=> {
            if(!res["data"]['cookroom']['is_cancelled']){
                setCookroomState([{
                    number_of_members: res['data']['cookroom'].number_of_members,
                    invited_friends: res['data']['cookroom'].invited_friends,
                    required_items: res['data']['cookroom'].required_items,
                    suggested_price: res['data']['cookroom'].suggested_price,
                    _id: res['data']['cookroom']._id,
                    title: res['data']['cookroom'].title,
                    location: res['data']['cookroom'].location,
                    description: res['data']['cookroom'].description,
                    date_time: res['data']['cookroom'].date_time,
                    recipe: res['data']['cookroom'].recipe,
                    instant_join: res['data']['cookroom'].instant_join,
                    is_volunteering: res['data']['cookroom'].is_volunteering
                }]);                    
            }
        })
    };


    // When the component is mounted, axios calls is performed to get the information from backend
    useEffect(() => getUserInformation() ,[]);

      const handleSaveBasicInfo = (values) => {
        const volunteering = Boolean(values.isVolunteering =="yes");

        const infoToPatch: Object[] = [];
        let changed =0;

        if(cookroomState[0].title !== values.title) {
            infoToPatch.push({propName: "title", value: values.title});
            changed=1;
        };
        if(cookroomState[0].location !== values.location) {
            infoToPatch.push({propName: "location", value: values.location});
            changed=1;
        };
        if(cookroomState[0].description !== values.description) {
            infoToPatch.push({propName: "description", value: values.description});
        };
        if(cookroomState[0].date_time !== values.dateOfPublish) {
            infoToPatch.push({propName: "date_time", value: values.dateOfPublish.toISOString()});
            changed = 1;
        };
        if(cookroomState[0].is_volunteering !== volunteering) {
            infoToPatch.push({propName: "is_volunteering", value: values.isVolunteering});
            changed=1;
        };
        if(cookroomState[0].suggested_price !== values.suggestedPrice) {
            infoToPatch.push({propName: "suggested_price", value: values.suggestedPrice});
            changed=1;
        };
        if(cookroomState[0].required_items[0] !== values.requiredItems) {
            infoToPatch.push({propName: "required_items", value: values.requiredItems});
            changed=1;
        };
        if(changed) {
            axios.patch(`/cookrooms/${props.id}`, infoToPatch)
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
                    <div className={classes.big}>Cookroom Edit View</div>
                    <Grid container>
                        <Grid item xs={12} className={classes.box}>
                            <Paper elevation={3} className={classes.paper}>
                            {
                                cookroomState.map((object, index) => {
                                    return(
                                        <GenInfo 
                                            requiredItems={object.required_items[0]}  
                                            suggestedPrice={object.suggested_price}
                                            title={object.title}
                                            description={object.description} 
                                            dateOfPublish={object.date_time}
                                            location={object.location}
                                            isVolunteering={object.is_volunteering ? "yes":"no"}
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



export default CookroomSPV;