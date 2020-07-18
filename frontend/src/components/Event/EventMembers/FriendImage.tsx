import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { deepOrange } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import { base64ToImage } from '../../../utils/imageUtils';

const useStyles = makeStyles((theme) => ({

    container: {
        position: 'relative',
    },
    boxstyle: {
        display: 'block',
        width: '85px',
        height: '85px',
        margin: '10px',
        border: '1px solid grey',
        overflow:'hidden',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '85px',
        height: '85px',
        backgroundColor: '#fc8803',
        overflow: 'hidden',
        transition: '.3s ease',
        opacity: 0.7,
        borderRadius: '50%',
    },
    overlayClick: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '85px',
        height: '85px',
        backgroundColor: '#78ff63',
        overflow: 'hidden',
        transition: '.3s ease',
        opacity: 0.7,
        borderRadius: '50%',
        border: '2px solid green',
    },
    darkborder: {
        border: '2px solid green',
    },
   
    text: {
        color: 'black',
        fontSize: '16px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        display: 'block',
        width: '85px',
        height: '85px',
        margin: '10px',
        border: '1px solid grey',
        overflow:'hidden',
        fontSize: '16px',
      },
      textInit: {
        color: 'white',
        fontSize: '32px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }
  }));

  interface Props {
    first_name: any;
    last_name: any;
    profile_picture: any;
    _id: any;
    addId: any;
    delId: any;
    key: any;
  }



export default function AvatarImage(props: Props){
    const [hovered, setHovered] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const classes = useStyles();

    const handleOver = () => {
        if (!clicked) {
            setHovered(true);
        } else {
            setHovered(false);
        }
    };
    const handleOut = () => {
        if (!clicked) {
            setHovered(false);
        } else {
            setHovered(false);
        }
    };
    const handleClicked =() => {
        setClicked(!clicked);
        console.log(count);
        if(count % 2 === 0){
            props.addId(props._id, props.first_name);
        } else {
            props.delId(props._id, props.first_name);
        }
        setCount(count+1);
    };


    return (
            <Tooltip title={props.first_name +' '+props.last_name} placement="bottom">
                <div className={classes.container} key={props.key} onMouseOver={handleOver} onMouseOut={handleOut} onClick={handleClicked}>
                    {
                        props.profile_picture
                        ?
                        <Avatar className={classes.boxstyle} src={`data:image/jpeg;base64,${props.profile_picture}`}/>
                        :
                        <Avatar className={classes.orange}><div className={classes.textInit}>{props.first_name[0] + props.last_name[0]}</div></Avatar>            
                    }         
                    <div className={classes.overlay} style={{transform: `${hovered ? 'translate(9px, 0px) scale(1)': 'translate(9px, 0px) scale(0) '}`}}>
                        <div className={classes.text}>Click to add</div>
                    </div>
                    <div className={classes.overlayClick} style={{transform: `${clicked ? 'translate(9px, 0px) scale(1)': 'translate(9px, 0px) scale(0) '}`}}>
                        <div className={classes.text}><DoneOutlineIcon fontSize="large"/></div>
                    </div>
                </div>
            </Tooltip>
        );
}
