import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Logo } from '../Logo/Logo';
import mealZeitLogo from '../../assets/images/MealZeit_logo.png';
import { ProfileBar } from './ProfileBar';

const useStyles = makeStyles((theme) => ({
    main: {
        height: '75px',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        boxSizing: 'border-box',
        zIndex: 90,
        boxShadow: '0 4px 2px rgba(50, 50, 50, 0.4)',
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

export const Header = () => {
    const classes = useStyles();
    return (
        <header className={classes.main}>
            <Logo imageSource={mealZeitLogo} altText='MealZeit' />
            <ProfileBar />
        </header>
    );
};