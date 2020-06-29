import React from 'react';
import styled from 'styled-components';
import { ChevronRight, ChevronLeft } from 'react-bootstrap-icons';

const StyledDivLeft = styled.div`
    height: 500px;
    width: 100px;
    //margin: 110px 0;
    padding: 200px 0;
    background-color: #e3e3e3;
    position: absolute;
    box-sizing: border-box;
    display: flex;
    float: left;
    left: 0px;
`;
const StyledDivRight = styled.div`
    height: 500px;
    width: 100px;
    //margin: 70px 0;
    padding: 200px 0;
    background-color: #e3e3e3;
    position: absolute;
    box-sizing: border-box;
    display: flex;
    float: right;
    right: 0px;
`;


interface Props {
    alignLeft: string;
}

export const Slider = (props: Props) => (
        props.alignLeft == 'left' ? <StyledDivLeft><ChevronLeft size={96} /></StyledDivLeft> : <StyledDivRight><ChevronRight size={96} /></StyledDivRight>
);
