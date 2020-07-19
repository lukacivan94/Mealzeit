import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import LoginForm from './LoginForm';
import axios from '../../axios';
import { History, LocationState } from 'history';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import setAuthToken from '../../utils/authToken';

/** (✓)
 * This is alert component from material-ui
 */
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

/** (✓)
 * This class handles authentication and login
 */

class Auth extends Component<AuthProps, AuthState> {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalText: '',
            isWarningModalOpen: false
        };
    }

    /** (✓)
     * This function handles login and calls axios post request
     * After successful call , it stores user information into localStorage
     */
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

                setAuthToken(token);

                axios.get('/users/' + userId)
                    .then(res => {
                        if (res.data && res.data.user) {
                            localStorage.setItem('user', JSON.stringify(res.data.user));
                            this.props.history.push('/');
                        }
                    })
                    .catch(err => {
                        console.error('err: ', err);
                    });
            })
            .catch(err => {
                console.error('err: ', err);
                this.setState({ isWarningModalOpen: true });
            });
    }

    /** (✓)
     * This function handles success modal close
     */

    handleModalClose = () => {
        this.setState({ isModalOpen: false, modalText: '' });
    }

    /** (✓)
     * This function handles warning modal close
     */
    handleWarningModalClose = () => {
        this.setState({ isWarningModalOpen: false });
    }

    /** (✓)
     * Render method consists of LoginForm and WarningModal for fail login request
     */
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

/** (✓)
 * Auth component uses redux connect to use actions and store 
 */
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
