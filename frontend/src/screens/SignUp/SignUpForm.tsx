import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
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
import { Container } from '@material-ui/core';

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

const validatePhoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined;


const normalizePhone = value => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
        return onlyNums
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
        6,
        10
    )}`
}
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
            fullWidth
            {...input}
            {...custom}
        />
    );

const radioButton = ({ input, ...rest }) => (
    <>
        <StyledFieldDiv>
            <InputLabel>Gender</InputLabel>
        </StyledFieldDiv>
        <StyledRadioField>
            <FormControl>
                <RadioGroup  {...input} {...rest}>
                    <FormControlLabel value='female' control={<Radio style={{ color: 'darkorange' }} />} label='Female' />
                    <FormControlLabel value='male' control={<Radio style={{ color: 'darkorange' }} />} label='Male' />
                    <FormControlLabel value='other' control={<Radio style={{ color: 'darkorange' }} />} label='Other' />
                </RadioGroup>
            </FormControl>
        </StyledRadioField>
    </>
);

const renderCheckbox = ({ input, label }) => (
    <StyledRadioField>
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
    </StyledRadioField>
);

const renderImageField = ({ classesButton, onDropMethod, value, ...custom }) => (
    <div>
        <StyledInputLabel>Profile Picture</StyledInputLabel>
        <input accept='image/*' id='icon-button-file' type='file' onChange={onDropMethod} />
        <label htmlFor='icon-button-file'>
            <IconButton color='primary' className={classesButton} component='span'>
                {/* <PhotoCamera /> */}
            </IconButton>
        </label>
    </div>
);

const StyledInputLabel = styled(InputLabel)`
    margin-bottom: 10px;
`;

const StyledFieldDiv = styled.div`
    margin: 10px 0;
`;

const StyledRadioField = styled(StyledFieldDiv)`
            display: flex;
            justify-content: center;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        button: {
            margin: theme.spacing(1)

        }
    })
);

interface SignUpProps {
    handleImage(imageText: string);
}

const SignUpForm = (props: SignUpProps & InjectedFormProps<{}, SignUpProps>) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    const classes = useStyles();

    const onDrop = (event) => {
        const acceptedFile = event.target.files[0];

        const reader: FileReader = new FileReader();
        reader.onload = () => {
            const fileAsBase64: string = reader && reader.result &&
                reader.result.toString().substr(reader.result.toString().indexOf(',') + 1) || '';
            if (fileAsBase64.length > 1) {
                props.handleImage(fileAsBase64);
            }
        };

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(acceptedFile);
    };

    return (
        <Container component='main' maxWidth='xs'>
            <StyledDiv>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <StyledFieldDiv>
                        <Typography
                            style={{ color: 'darkorange' }}
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
                            classesButton={classes.button}
                            validate={validatePhoneNumber}
                            normalize={normalizePhone}
                        />
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='image'
                            component={renderImageField}
                            label='Image'
                            onDropMethod={onDrop}
                        />
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
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        endIcon={<Icon />}
                        className={classes.submit}
                        onClick={props.handleSubmit}
                    >
                        Sign Up
                        </Button>
                    <Button
                        type='button'
                        variant='contained'
                        color='default'
                        fullWidth
                        disabled={pristine || submitting}
                        onClick={reset}
                    >
                        Clear Values
                  </Button>
                </form>
            </StyledDiv>
        </Container>
    );
};

export default reduxForm<{}, SignUpProps>({
    form: 'signUpForm', // a unique identifier for this form
    validate,
    initialValues: {
        dateOfBirth: moment(new Date()).format('YYYY-MM-DD'),
        languages: [],
        image: ''
    }
})(SignUpForm);