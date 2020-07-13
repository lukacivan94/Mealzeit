import React, { Component } from 'react';
import Screen from './Screen/Screen';
//import Filters from './Browse/Filters';
//import {EventDiv, TextDiv, StyleDiv, TextSmallDiv, RowDiv, ButtonStyle} from 'components'
import SampledEvents from './Browse/sampleEvents';
import MultipleSelect from './Browse/Filters';
import {FriendCard} from './Browse/CardList';
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
    icon: {
        transform: 'translate(-10px, 5px)',
        padding: '2px',
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'column',
        justify: 'flex-start',
        alignItems: 'center',
    },
    button: {
        background: '#F88805',
        color: 'white',
        fontSize: '1.2em',
        margin: '0.6em',
        padding: '0.2em 1.5em',
        border: '1px solid #F88805',
        borderRadius: '25px',
        outline: 'none',
    },
    big: {
        fontSize: '50px',
        paddingTop: '30px',
        paddingBottom: '5px',
    },
    small: {
        fontSize: '18px',
        paddingTop: '30px',
        paddingBottom: '30px',
    },
    text: {
        paddingBottom: '4px',
    },
}));

export const Browse = () => { 
    const classes = useStyles();
    
        return(
            <Screen>
                <div className={classes.root}>
                    <div className={classes.wrapper}>
                        <div className="Browse-text_header">
                            What are you looking for? 
                        </div>
                        <div className="Browse-text_paragraph">
                            Whether you want to help or simplymeet someone- at Mealzeit you will find an event that fits you best
                        </div>
                        <MultipleSelect/>
                        
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