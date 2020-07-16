import React, { useEffect, Dispatch, SetStateAction } from 'react';
import LeftRightSlider from '../../components/ImageSlider/LeftRightSlider';
import AvatarImage from '../../components/AvatarProfile/AvatarImage';
import mealZeitLogo from '../../assets/images/MealZeit_logo.png';
import styled from 'styled-components';
import { Container, Typography, FormControlLabel, Checkbox, InputLabel, TextField, Button, makeStyles } from '@material-ui/core';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import axios from '../../axios';

const StyledFieldDiv = styled.div`
    margin-bottom: 10px;
`;

const StyledCheckboxFielddDiv = styled.div`
    margin: 20px 0;

`;

const StyledCheckboxdDiv = styled(StyledCheckboxFielddDiv)`
    display: flex;
    justify-content: center;
`;

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'unset'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'darkorange'
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    buttondiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}));

const renderCheckbox = ({ input, label }) => (
    <StyledCheckboxFielddDiv>
        <InputLabel>Sharing Options</InputLabel>
        <StyledCheckboxdDiv>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={!!input.value}
                        onChange={input.onChange}
                        style={{
                            color: 'darkorange'
                        }}
                    />
                }
                label={label}
            />
        </StyledCheckboxdDiv>
    </StyledCheckboxFielddDiv>
);

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
}) => (
        <TextField
            label={label}
            type={type}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );

const StyledFriendDiv = styled.div`
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface RecipeShareProps {
    setSelectedFriends: Dispatch<SetStateAction<string[]>>;
    selectedFriends: string[];
    isPrivate: boolean;
    handleBack();
}

type Props = InjectedFormProps<{}, RecipeShareProps> & RecipeShareProps;

const RecipeShareStep = ({ isPrivate, handleBack, handleSubmit, selectedFriends, setSelectedFriends }: Props) => {
    const classes = useStyles();
    const [userFriends, setUserFriends] = React.useState<Object[]>([]);
    // const [selectedFriends, setSelectedFriends] = React.useState<string[]>([]);

    useEffect(() => getFriends(), []);

    const getFriends = () => {
        const userId = localStorage.getItem('userId');
        axios.get('/users/' + userId)
            .then(res => {

                const frineds = res.data && res.data.user && res.data.user.friends.map((friend) => {

                    axios.get('/users/' + friend)
                        .then(res => {
                            console.log('res friend: ', res);
                            const friendInfo = res.data.user;
                            setUserFriends(userFriends => [...userFriends, friendInfo]);
                        })
                        .catch(error => {
                            if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            }
                        });
                });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    const handleSelectedFriends = (index) => {
        setSelectedFriends(selectedFriends => [...selectedFriends, userFriends[index]._id]);
    };

    useEffect(() => {
        console.log('user friends', userFriends);
    });

    useEffect(() => {
        console.log('selected friends', selectedFriends);
    });


    return (
        <Container component='main' maxWidth='sm'>
            <Typography component='h1' variant='h5' style={{ color: 'darkorange' }}>
                Sharing My Recipe
                    </Typography>
            <StyledFieldDiv>
                <StyledFieldDiv>
                    <Field
                        name='isPrivate'
                        component={renderCheckbox}
                        label='Private'
                    />
                </StyledFieldDiv>
            </StyledFieldDiv>
            {!isPrivate &&
                <>
                    <StyledFieldDiv>
                        <LeftRightSlider>
                            {userFriends && userFriends.map((friend, index) => {
                                console.log('friend ', index, ' ', friend);

                                return (
                                    <StyledFriendDiv>
                                        <AvatarImage src={mealZeitLogo} key={index} alignItems='center' justifyContent='center' onClick={() => handleSelectedFriends(index)} />
                                        <p>{friend.first_name + ' ' + friend.last_name}</p>
                                    </StyledFriendDiv>
                                );
                            })

                            }
                        </LeftRightSlider>
                    </StyledFieldDiv>
                </>

            }
            <div className={classes.buttondiv}>
                <Button
                    onClick={handleBack}
                    className={classes.backButton}
                >
                    Back
                </Button>
                <Button variant='contained' style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleSubmit}>
                    Finish
                    </Button>
            </div>
        </Container>
    );
};

const selector = formValueSelector('recipeShareForm');

const mapStateToProps = (state) => ({
    isPrivate: selector(state, 'isPrivate')
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm<{}, RecipeShareProps>({
    form: 'recipeShareForm'
})(RecipeShareStep));
