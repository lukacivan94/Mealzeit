import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundColor: 'transparent',
        padding: '2px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        float: 'left',
    },
    image: {
        height: '100%',
    },
    title: {
        padding: '12px 20px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '30px',
    },
}));

interface Props {
    imageSource: string;
    altText: string;
}

export const Logo = (props: Props) => {
    const classes = useStyles();
    return(
        <div className={classes.main}>
            <img className={classes.image} src={props.imageSource} alt={props.altText} />
            <div className={classes.title}> MealZeit</div>
        </div>
    );
}
