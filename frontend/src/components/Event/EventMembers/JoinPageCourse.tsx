import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import RadioSelect from '../RadioSelect';
import { TextDiv, TextSmallDiv, RowDiv } from '../../Styling/TextStyle';


const useStyles = makeStyles((theme) => ({
    container: {
        fontFamily: 'Source Sans Pro, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    eventdiv: {
        paddingTop: '5px',
        paddingBottom: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
  }));


export default function MoreInfo() {
    const classes = useStyles();
        return (
            <div className={classes.container}>
                    <TextDiv>
                        Participants Information
                    </TextDiv>
                <div className={classes.eventdiv}>
                    <RowDiv>
                        <TextSmallDiv>set number of members</TextSmallDiv>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="outlined-number1"
                                //label='€'
                                type="number"
                                defaultValue="0"
                                inputProps={{ min: "0", max: "50", step: "1" }} 
                                variant="outlined"
                                />
                        </form>
                    </RowDiv>
                    <RowDiv>
                        <TextSmallDiv>Is this event virtual?</TextSmallDiv>
                        <RadioSelect label1="Yes" label2="No" />
                    </RowDiv>
                </div>

                <Divider variant="middle" />

                <div className={classes.eventdiv}>
                    <RowDiv>
                        <TextSmallDiv>set the price</TextSmallDiv>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="outlined-number2"
                                label='€'
                                type="number"
                                defaultValue="0"
                                inputProps={{ min: "0", max: "50", step: "1" }} 
                                variant="outlined"
                                />
                        </form>
                    </RowDiv>
                    <RowDiv>
                        <TextSmallDiv>Is this event included in premium?</TextSmallDiv>
                        <RadioSelect label1="Yes" label2="No" />
                    </RowDiv>
                </div>
            </div>
        );
}