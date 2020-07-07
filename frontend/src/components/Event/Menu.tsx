import React, { Component } from 'react';
import styled from 'styled-components';
import LeftRightSlider from './LeftRightSlider';


const TextSmallDiv= styled.div`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 22px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 0px;
    padding-right: 0px;
    color: orange;
`;

const Eventdiv= styled.div`
    padding-top: 10px;
    padding-bottom: 30px;
`;

const TextDiv= styled.div`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 35px;
    padding-top: 30px;
    padding-bottom: 20px;
`;
const StyledDiv = styled.div`
    font-family: 'Source Sans Pro', sans-serif;
    padding: 0px 20px 70px 80px;
`;

class Menu extends Component {
    render() {
        return (
            <StyledDiv>
                <Eventdiv>
                    <TextDiv>
                        What's on the Menu?
                    </TextDiv>
                    <TextSmallDiv>Your Recipes</TextSmallDiv>
                    <LeftRightSlider />
                    <TextSmallDiv>Public Recipes</TextSmallDiv>
                    <LeftRightSlider />
                    <TextSmallDiv>Premium Recipes</TextSmallDiv>
                    <LeftRightSlider />
                </Eventdiv>
            </StyledDiv>
        );
    }
}

export default Menu;