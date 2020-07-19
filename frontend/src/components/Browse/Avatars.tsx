import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import { Theme,createStyles, makeStyles } from '@material-ui/core/styles';

function importAll(r) {
    return r.keys().map(r);
};
const useStyles = makeStyles((theme: Theme) =>
createStyles({
    ParentDiv: {
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        padding: '5px',
        
      },
      text:{
        fontColor: 'black',
        padding:'10px',
      },
    }),
);

interface Props {
    Invited: String;
    text:string;
    name:string;
}

export default function  Avatars(props:Props){
    const classes = useStyles();
    return (
        <div className = {classes.ParentDiv}> 
                <Avatar alt={props.name} src={props.Invited}/>
                <div className={classes.text}>{props.text} </div>   
        </div>
             
        
    );
}




