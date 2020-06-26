import React from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/Send';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MultipleSelectField } from '../../components/MultipleSelectField/MultipleSelectField';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';

const languages = [
    'English',
    'German',
    'Turkish'
];

const validate = values => {
    const errors = { email: '' };
    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'password',
        'phoneNumber',
        'gender'
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

const radioButton = ({ input, ...rest }) => (
    <StyledFieldDiv>
        <InputLabel>Gender</InputLabel>
        <FormControl>
            <RadioGroup  {...input} {...rest}>
                <FormControlLabel value='female' control={<Radio style={{ color: 'darkorange' }} />} label='Female' />
                <FormControlLabel value='male' control={<Radio style={{ color: 'darkorange' }} />} label='Male' />
                <FormControlLabel value='other' control={<Radio style={{ color: 'darkorange' }} />} label='Other' />
            </RadioGroup>
        </FormControl>
    </StyledFieldDiv>
);

const renderCheckbox = ({ input, label }) => (
    <div>
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
    </div>
);

const StyledForm = styled.form`
    margin: 0% 30%;
    background-color: lightgrey;
    padding: 5% 0% 5% 10%;
    width: 30%;
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 50%;
`;

const StyledClearButton = styled.div`
    margin-left: 10px;
`;

const StyledFieldDiv = styled.div`
    margin-bottom: 10px;
`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1)
        }
    })
);

const SignUpForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    const classes = useStyles();

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledFieldDiv>
                <Typography
                    style={{ color: 'mediumblue' }}
                    component='h1'
                    variant='h5'>
                    Sign-up Form
                </Typography>
            </StyledFieldDiv>
            <StyledFieldDiv>
                <Field
                    name='firstName'
                    component={renderTextField}
                    label='First Name'
                />
            </StyledFieldDiv>
            <StyledFieldDiv>
                <Field
                    name='lastName'
                    component={renderTextField}
                    label='Last Name'
                />
            </StyledFieldDiv>

            <StyledFieldDiv>
                <Field name='gender' component={radioButton}>
                    <Radio value='male' />
                    <Radio value='female' />
                </Field>
            </StyledFieldDiv>
            <StyledFieldDiv>
                <Field
                    name='dateOfBirth'
                    component={renderTextField}
                    type='date'
                    label='Date Of Birth'
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </StyledFieldDiv>
            <div />
            <StyledFieldDiv>
                <Field
                    name='phoneNumber'
                    component={renderTextField}
                    label='Phone Number'
                />
            </StyledFieldDiv>
            <StyledFieldDiv>
                <InputLabel>Profile Picture</InputLabel>
                <input accept='image/*' id='icon-button-file' type='file' />
                <label htmlFor='icon-button-file'>
                    <IconButton color='primary' className={classes.button} component='span'>
                        {/* <PhotoCamera /> */}
                    </IconButton>
                </label>
            </StyledFieldDiv>
            <StyledFieldDiv>
                <MultipleSelectField
                    name='languages'
                    inputLabel='Languages'
                    items={languages}
                />
            </StyledFieldDiv>
            <StyledFieldDiv>
                <Field
                    name='isExpertUser'
                    component={renderCheckbox}
                    label='Expert User' />
            </StyledFieldDiv>
            <StyledFieldDiv>
                <Field
                    name='email'
                    component={renderTextField}
                    label='Email'
                />
            </StyledFieldDiv>
            <StyledFieldDiv>
                <Field
                    name='password'
                    component={renderTextField}
                    label='Password'
                    type='password'
                />
            </StyledFieldDiv>
            <div>
                <StyledButton
                    variant='contained'
                    color='primary'
                    endIcon={<Icon />}
                    className={classes.button}
                    onClick={props.handleSubmit}
                >
                    Submit
                  </StyledButton>
            </div>
            <StyledClearButton>
                <Button
                    type='button'
                    variant='contained'
                    color='default'
                    disabled={pristine || submitting}
                    onClick={reset}
                >
                    Clear Values
                  </Button>
            </StyledClearButton>
        </StyledForm>
    );
};

export default reduxForm({
    form: 'signUpForm', // a unique identifier for this form
    validate,
    initialValues: {
        dateOfBirth: moment(new Date()).format('YYYY-MM-DD'),
        languages: []
    }
})(SignUpForm);