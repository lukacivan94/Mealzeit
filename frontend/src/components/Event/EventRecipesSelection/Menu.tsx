import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import LeftRightSlider from '../../ImageSlider/LeftRightSlider';

import AvatarImage from '../../AvatarProfile/AvatarImage';
import {ButtonStyle, StyleDiv, EventDiv, TextDiv, TextSmallDiv } from '../../Styling/TextStyle';

class Menu extends Component {
    render() {

        function importAll(r) {
            return r.keys().map(r);
        };
        const listOfImages = importAll(require.context('../../../assets/images/profiles/', false, /\.(png|jpe?g|svg)$/));
        
        return (
            <StyleDiv>
                <EventDiv>
                    <TextDiv>
                        What's on the Menu?
                    </TextDiv>
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextSmallDiv>Your Recipes</TextSmallDiv>
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
                    <TextSmallDiv>Public Recipes</TextSmallDiv>
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
                    <TextSmallDiv>Or ...</TextSmallDiv>
                    <ButtonStyle>Create Recipe</ButtonStyle>
                </EventDiv>
            </StyleDiv>
        );
    }
}

export default Menu;