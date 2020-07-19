import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

/*
* Common component and can be used accross any other component.
* Loads the picture in the avatar and gives hover effect to it.
* 
*/

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
        overflow: 'hidden',
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

}));


export default function AvatarImage(props) {
    const { key, src, onClick } = props;
    const [hovered, setHovered] = React.useState(false);
    const classes = useStyles();

    const handleOver = () => {
        setHovered(true);
    };
    const handleOut = () => {
        setHovered(false);
    };


    return (
        <div className={classes.container} key={key} onMouseOver={handleOver} onMouseOut={handleOut} onClick={onClick}>
            <Avatar className={classes.boxstyle} src={src} />
            <div className={classes.overlay} style={{ transform: `${hovered ? 'translate(9px, 0px) scale(1)' : 'translate(9px, 0px) scale(0) '}` }}>
                <div className={classes.text}>Click to add</div>
            </div>
        </div>
    );
}
