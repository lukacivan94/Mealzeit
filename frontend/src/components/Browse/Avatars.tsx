import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';


function importAll(r) {
    return r.keys().map(r);
};
const ParentDiv = styled.div`
    background-color: white;
    padding: 5px;
    position:relative
`;
const StyledDiv = styled.div`
    background-color: white;
    font-color: black;
    position:absolute
`;
interface Props {
    imageSource: string;
    text:string;
}

export default function  Avatars(props:Props){
    console.log(props.imageSource);
    const listOfImages = importAll(require.context('../../assets/images/Invited/', false, /\.(png|jpe?g|svg)$/));
    //console.log(listOfImages)
    return (
        <div>
            <ParentDiv> 
                {
                    listOfImages.map(
                    (image, index) => <Avatar key={index} src={image.default}/>
                    )
                }
        </ParentDiv>
        <StyledDiv>{props.text} </StyledDiv>
        </div>
        
        
    );
}



