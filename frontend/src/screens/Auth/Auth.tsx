import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import LoginForm from './LoginForm';
import axios from '../../axios';

// TODO: (burak) It will be added later
// import setAuthToken from 'utils/authToken';
// import jwt_decode from 'jwt-decode';

interface AuthState {
    isModalOpen: boolean;
    modalText: string;
}

export default class Auth extends Component<{}, AuthState> {

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
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);

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
