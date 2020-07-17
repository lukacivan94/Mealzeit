import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import LoginForm from './LoginForm';
import axios from '../../axios';
import { History, LocationState } from 'history';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// import { Alert } from '@material-ui/lab';

// TODO: (burak) It will be added later
// import setAuthToken from 'utils/authToken';
// import jwt_decode from 'jwt-decode';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
};

interface AuthState {
    isModalOpen: boolean;
    modalText: string;
    isWarningModalOpen: boolean;
}

interface AuthProps {
    isLoggedIn: boolean;
    history: History<LocationState>;
    login(userId);
}

class Auth extends Component<AuthProps, AuthState> {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalText: '',
            isWarningModalOpen: false
        };
    }

    handleLogin = (values) => {
        const loginData = {
            password: values.password,
            email: values.email
        };

        axios.post('/users/login', loginData)
            .then(res => {
                const { token, userId } = res.data;
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userId', userId);

                this.props.login(userId);
                axios.get('/users/' + userId)
                    .then(res => {
                        console.log('res: ', res);
                        if (res.data && res.data.user) {
                            localStorage.setItem('user', JSON.stringify(res.data.user));
                            this.props.history.push('/');
                        }

                    })
                    .catch(err => {
                        console.error('err: ', err);
                    });

                // TODO: (burak) It will be added later
                // setAuthToken(token);
                // const decoded = jwt_decode(token);
            })
            .catch(err => {
                console.error('err: ', err);
                this.setState({ isWarningModalOpen: true });
            });
    }

    handleModalClose = () => {
        this.setState({ isModalOpen: false, modalText: '' });
    }

    handleWarningModalClose = () => {
        this.setState({ isWarningModalOpen: false });
    }

    render() {
        return (
            <Screen>
                <>
                    <LoginForm onSubmit={this.handleLogin} />
                    <Snackbar open={this.state.isWarningModalOpen} autoHideDuration={6000} onClose={this.handleWarningModalClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert severity='error'>The email or password is incorrect! </Alert>
                    </Snackbar>
                </>
            </Screen >
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);