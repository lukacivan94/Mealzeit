import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import {EventDiv, TextBigDiv, TextSmallDiv} from '../../components/Styling/TextStyle';
import MultipleSelect from '../../components/Browse/Filters';
import { makeStyles } from '@material-ui/core/styles';

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
                            <MultipleSelect/>
                        </EventDiv>
                        
                    </div>
                </div>
            </Screen>
        );
    
}

export default Browse;

// const [selectedDate, setSelectedDate] = React.useState<Date | null>(
//     new Date(),
//   );
//   const [selectedEvent, setSelectedEvent] = React.useState<string | null>( "");

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };
//   const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedEvent(event.target.value);
//   }
//   const [values, setValues] = React.useState<State>({
//     numberformat: '4',
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value,
//     });
    
//   };