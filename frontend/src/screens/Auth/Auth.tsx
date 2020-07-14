import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import LoginForm from './LoginForm';
import axios from '../../axios';
import { History, LocationState } from 'history';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';

// TODO: (burak) It will be added later
// import setAuthToken from 'utils/authToken';
// import jwt_decode from 'jwt-decode';

interface AuthState {
    isModalOpen: boolean;
    modalText: string;
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
            modalText: ''
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

                this.props.history.push('/');

                // TODO: (burak) It will be added later
                // setAuthToken(token);
                // const decoded = jwt_decode(token);
            })
            .catch(err => {
                console.error('err: ', err);
            });
    }

    handleModalClose = () => {
        this.setState({ isModalOpen: false, modalText: '' });
    }

    render() {
        return (
            <Screen>
                <LoginForm onSubmit={this.handleLogin} />
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