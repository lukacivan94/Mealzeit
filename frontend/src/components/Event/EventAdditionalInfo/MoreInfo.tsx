import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import RadioSelect from '../RadioSelect';
import {StyleDiv, EventDiv, TextDiv, TextSmallDiv } from '../../Styling/TextStyle';

const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
  });


export default function MoreInfo({ course }) {
    //const classes = useStyles();
        return (
            <StyleDiv>
                <MuiThemeProvider theme={theme}>
                    <TextDiv>
                        Tell us more?
                    </TextDiv>

                <EventDiv>
                    <TextSmallDiv>Give your Event a title</TextSmallDiv>
                    <TextField
                        id="standard-basic"
                        style={{ width: '90%'}}
                        />
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextSmallDiv>Add description</TextSmallDiv>
                    <TextField
                        id="standard-multiline-static"
                        style={{ width: '90%'}}
                        multiline
                        rows={2}
                        variant="outlined"
                        />
                </EventDiv>
                <Divider variant="middle" />
                {
                    course
                    ? 
                    <div>
                    <EventDiv>
                        <TextSmallDiv>Is this a volunteering event?</TextSmallDiv>
                        <RadioSelect label1="Yes" label2="No" />
                    </EventDiv>
                    <Divider variant="middle" />
                    <EventDiv>
                        <TextSmallDiv>What should people bring?</TextSmallDiv>
                        <TextField
                            id="standard-multiline-static"
                            style={{ width: '90%'}}
                            multiline
                            rows={2}
                            variant="outlined"
                            />
                    </EventDiv>
                    <Divider variant="middle" />
                    <EventDiv>
                    <TextSmallDiv>...or suggest price split?</TextSmallDiv>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="outlined-number"
                            label='€'
                            type="number"
                            defaultValue="0"
                            inputProps={{ min: "0", max: "50", step: "1" }} 
                            variant="outlined"
                            />
                    </form>
                    </EventDiv>
                </div>
                :
                null
                }
                </MuiThemeProvider>
            </StyleDiv>
        );
}