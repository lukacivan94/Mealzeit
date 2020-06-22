import React from 'react';
import styled from 'styled-components';


const StyledFooter = styled.div`
    background-color: #F88805;
    border-top: 1px solid #E7E7E7;
    text-align: center;
    padding: 20px;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 40px;
    width: 100%;
`;

const StyledFooterHeader = styled.div`
    display: block;
    padding: 20px;
    height: 30px;
    width: 100%;
`;

const StyledLink = styled.a`
    padding: 10px;

    color: white;
    text-decoration: none;
    text-align: center;
`;

const StyledList = styled.ul`
    color: $white;

    display: flex;
`;

const StyledListItem = styled.li`
    list-style-type: none;
`;

const Footer = () => (
    <>
        <StyledFooterHeader />
        <StyledFooter >
            <StyledList >
                <StyledListItem><span>-</span></StyledListItem>
                <StyledListItem><StyledLink href='/'>Team</StyledLink></StyledListItem>
                <StyledListItem><span>-</span></StyledListItem>
                <StyledListItem><StyledLink href='/'>Help and Support</StyledLink></StyledListItem>
                <StyledListItem><span>-</span></StyledListItem>
                <StyledListItem><StyledLink href='/'>Partnership</StyledLink></StyledListItem>
            </StyledList>
        </StyledFooter>
    </>
);

export default Footer;