import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Screen from '../Screen/Screen';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    height: 100%;
    padding: 0;
  }
`

const StyledDiv= styled.div`
    height: 100%;
    display: inline-block;
    flex-direction: column;
    background-color: transparent;
    justify-content: space-between;
    z-index: 1000;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  //flex: 1;
  padding: 30px;
  border: none;
  display: inline-block;
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;
  align-items: center;
  padding-top: 50px;
  margin: 0 auto;
`;

const TextDiv= styled.div`
    font-size: ${props => props.big ? "50px" : "18px"};
    padding-top: 30px;
    padding-bottom: ${props => props.big ? "5px" : "30px"};
`;

const Button = styled.button`
  background: ${props => props.primary ? "#F88805" : "white"};
  color: ${props => props.primary ? "white" : "#F88805"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #F88805;
  border-radius: 3px;
  font-size: 16px;
`;

class HomePage extends Component {
    render() {
        return (
            <Screen>
                <StyledDiv>
                    <GlobalStyle />
                    <Wrapper> 
                        <TextDiv big>And Who will you meet next? </TextDiv>
                        <TextDiv>Whether you want to help or simply meet someone - at MealZeit you'll find an event that fits you best.</TextDiv>
                        <Button primary>find an event</Button> 
                    </Wrapper>     
                </StyledDiv>
            </Screen>
        );
    }
}

export default HomePage;