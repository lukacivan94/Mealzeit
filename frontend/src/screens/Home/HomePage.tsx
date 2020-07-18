import React, { useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { History, LocationState } from 'history';
import Screen from '../../components/Screen/Screen';
import { connect } from 'react-redux';
import { Modal } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        margin: '50px 50px 0 50px',
    },
    wrapper: {
        padding: '30px',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '50px',
        margin: '0 auto',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    icon: {
        transform: 'translate(-10px, 5px)',
        padding: '2px',
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'column',
        justify: 'flex-start',
        alignItems: 'center',
    },
    button: {
        background: '#F88805',
        color: 'white',
        fontSize: '1.2em',
        margin: '0.6em',
        padding: '0.2em 1.5em',
        border: '1px solid #F88805',
        borderRadius: '25px',
        outline: 'none',
    },
    big: {
        fontSize: '50px',
        paddingTop: '30px',
        paddingBottom: '5px',
    },
    small: {
        fontSize: '18px',
        paddingTop: '30px',
        paddingBottom: '30px',
    },
    text: {
        paddingBottom: '4px',
    },
}));

const StyledText = styled.p`
    margin: 20% 30%;
    background-color: white;
    padding: 10% 15%;
    text-align: center;
    color: darkorange;
    text-transform: capitalize;
    font-size: x-large;
    font-family: cursive;
`;

interface Props {
    history: History<LocationState>;
    isLoggedIn: boolean;
}

export const HomePage = (props: Props) => {
    const classes = useStyles();
    const [isModalOpen, setModal] = React.useState(false);

    const handleButtonClick = (routeName) => {
        const { history } = props;
        const token = localStorage.getItem('jwtToken');
        if (!!token || routeName === 'browse') {
            history.push('/' + routeName);
        } else {
            setModal(true);
        }
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const user = localStorage.getItem('user');
    const userInfo = JSON.parse(user);

    return (
        <Screen>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.big}>And who will you meet next? </div>
                    <div className={classes.small}>Whether you want to help or simply meet someone - at MealZeit you'll find an event that fits you best.</div>
                    <div className={classes.buttonRow}>
                        <button className={classes.button} onClick={() => handleButtonClick('browse')}><div className={classes.text}><SearchIcon className={classes.icon} />Find an event</div></button>
                        {((userInfo && !userInfo.is_expert_user) || !userInfo) &&
                            <button className={classes.button} onClick={() => handleButtonClick('course')}><div className={classes.text}><EventNoteIcon className={classes.icon} />Create a course</div> </button>
                        }
                        <button className={classes.button} onClick={() => handleButtonClick('cookroom')}><div className={classes.text}><EventNoteIcon className={classes.icon} />Create a cookroom</div> </button>
                        <button className={classes.button} onClick={() => handleButtonClick('recipe')}><div className={classes.text}><FastfoodOutlinedIcon className={classes.icon} />Create a recipe</div> </button>
                    </div>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
            >
                <StyledText>You must be signed in</StyledText>
            </Modal>
        </Screen>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(HomePage);