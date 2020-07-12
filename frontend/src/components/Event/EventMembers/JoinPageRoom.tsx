import React from 'react';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';

import AvatarImage from '../../AvatarProfile/AvatarImage';
import Counter from './Counter';
import RadioSelect from '../RadioSelect';
import LeftRightSlider from '../../ImageSlider/LeftRightSlider';
import {StyleDiv, EventDiv, TextDiv } from '../../Styling/TextStyle';

export default function JoinPageRoom() {
        function importAll(r) {
            return r.keys().map(r);
        };
        const listOfImages = importAll(require.context('../../../assets/images/profiles/', false, /\.(png|jpe?g|svg)$/));
        
        return (
            <StyleDiv>
                <EventDiv>
                    <TextDiv>
                        Who would you like to join?
                    </TextDiv>
                        <LeftRightSlider>
                            
                                {
                                listOfImages.map(
                                    (image, index) =>  <AvatarImage key={index} src={image.default}/>
                                )
                                }
                            
                        </LeftRightSlider>
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextDiv>
                        Make your event public?
                    </TextDiv>
                    <Counter />
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextDiv>
                        Can people join instantly?
                    </TextDiv>
                    <RadioSelect label1="Yes, Sure!" label2="No, I will reply to each request myself." />
                </EventDiv>
            </StyleDiv>
        );
};