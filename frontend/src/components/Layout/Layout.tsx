import React from 'react';
import Background from '../../assets/images/Background.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundImage: 'url(' + Background + ')',
        backgroundrRepeat: 'non-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        height: 'auto',
        width: '100%',
        margin: '75px 0 30px',
        paddingBottom: '30px',
        minHeight: '805px'
    }
}));

export const Layout = (props: any) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            {props.children}
        </div>
    );
}