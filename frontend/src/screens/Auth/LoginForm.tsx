import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Container, Button, Typography, makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const validate = values => {
    const errors = { email: '' };
    const requiredFields = [
        'email',
        'password'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    return errors;
};

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
    }
}));

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const LoginForm = ({ handleSubmit }) => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='xs'>
            <StyledDiv>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Field
                        name='email'
                        component={renderTextField}
                        label='Email'
                    />
                    <Field
                        name='password'
                        component={renderTextField}
                        label='Password'
                        type='password'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </StyledDiv>
        </Container>
    );
};

export default reduxForm({
    form: 'login',
    validate
})(LoginForm);