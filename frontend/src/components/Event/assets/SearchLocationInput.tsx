import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    font-family: 'Source Sans Pro', sans-serif;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: white;
  border-radius: 25px;
  width: 75%;
  border: 1px solid grey;
`;

export const SearchLocationInput = () => (
    <StyledDiv>
        <Input defaultValue="Type the address" type="text" />
    </StyledDiv>
);
