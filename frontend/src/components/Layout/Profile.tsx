import React from 'react';
import styled from 'styled-components';

const StyledNavProfile = styled.nav`
    position: relative;
    background-color: transparent;
    height: 70%;
`;

const ProfileImg = styled.img`
    border: 1px solid red;
    border-radius: 50%;
    height: 100%;
`;

const Badge = styled.span`
    position: absolute;
    top: 0px;
    right: 60px;
    padding: 3px 9px;
    border-radius: 50%;
    background-color: red;
    color: white;
    font-weight: bold;
    align-items: center;
`;

interface Props {
    imageSource: string;
    altText: string;
}

export const Profile = (props: Props) => (
    <StyledNavProfile>
        <ProfileImg src={props.imageSource} alt={props.altText} />
        <Badge> 1 </Badge>
    </StyledNavProfile>
);
