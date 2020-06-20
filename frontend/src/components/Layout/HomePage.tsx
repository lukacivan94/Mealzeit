import React, { Component } from 'react';
import styled from 'styled-components';
import Background from '../../assets/images/Background.png';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';

const Wrapper = styled.div`
  font-size: 100px;
  height: 100%;
  //flex: 1;
  background-image: url(${Background}) no-repeat;
  background-size: cover;
  z-index: 1000;
  padding: 30px;
  border: none;
  display: flex;
  
`;

const StyledDiv= styled.div`
    height: 100%;
    display: inline-block;
    flex-direction: column;
    background-color: transparent;
    justify-content: space-between;
`;

class HomePage extends Component {
    render() {
        return (
            <StyledDiv>
                <Header />
                <Wrapper>Hello </Wrapper>     
                <Footer />
            </StyledDiv>
        );
    }
}

export default HomePage;