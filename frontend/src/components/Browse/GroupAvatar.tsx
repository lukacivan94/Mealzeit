import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

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
    inviteeText:string;
}


export default function GroupAvatars(props:Props) {
    const classes = useStyles();
    const listOfImages = importAll(require.context('../../assets/images/Invitee/', false, /\.(png|jpe?g|svg)$/));
  return (
    <div className={classes.ParentDiv}>
        <AvatarGroup max={4}> 
                    {
                        listOfImages.map(
                        (image, index) => <Avatar key={index} src={image.default}/>
                        )
                        
                    }
        </AvatarGroup>
        <div className={classes.text}>{props.inviteeText} </div>
    </div>            
  );
}