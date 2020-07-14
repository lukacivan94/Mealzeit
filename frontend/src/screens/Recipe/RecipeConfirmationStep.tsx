import React from 'react';
import { Container, Typography } from '@material-ui/core';
import successIcon from '../../assets/images/confirmed.jpg';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
    height: 300px;
`;

const StyledImg = styled.img`
    height: 50%;
`;

export const RecipeConfirmationStep = () => {
    return (
        <Container component='main' maxWidth='sm'>
            <StyledDiv>
                <StyledImg src={successIcon} />
                <Typography component='h1' variant='h5'>
                    Recipe is created
            </Typography>
            </StyledDiv>
        </Container>
    );
};
