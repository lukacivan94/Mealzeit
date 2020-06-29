import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    background-color: #F88805;
    border-top: 1px solid #F88805;
    text-align: center;
    padding: 20px;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 2%;
    width: 100%;
    box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.5);
`;

/*const StyledFooterHeader = styled.div`
    display: block;
    padding: 20px;
    height: 10px;
    width: 100%;
    box-shadow: 0 4px 2px rgba(50, 50, 50, 0.4);
`;
*/

const StyledLink = styled.a`
    margin: 30px;
    padding-bottom: 30px;
    color: white;
    text-decoration: none;
    text-align: center;
`;

const StyledList = styled.div`
    color: $white;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;

const StyledListItem = styled.nav`
    list-style-type: none;
    padding-bottom: 30px;
`;

const Footer = () => (
    <>
        <StyledFooter >
            <StyledList >
                <StyledListItem><StyledLink href='/'>About Us</StyledLink></StyledListItem>
                <StyledListItem><StyledLink href='/'>Help and Support</StyledLink></StyledListItem>
                <StyledListItem><StyledLink href='/'>Partnership</StyledLink></StyledListItem>
            </StyledList>
        </StyledFooter>
    </>
);

export default Footer;