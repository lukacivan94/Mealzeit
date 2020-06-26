import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import SignUpForm from '../SignUp/SignUpForm';
import axios from '../../axios';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';

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

interface SignupState {
    isModalOpen: boolean;
    modalText: string;
}

export default class Signup extends Component<{}, SignupState> {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalText: ''
        };
    }

    handleSignup = (values) => {

        const newUser = {
            email: values.email,
            password: values.password,
            first_name: values.firstName,
            last_name: values.lastName,
            phone_number: values.phoneNumber,
            gender: values.gender,
            date_of_birth: new Date(values.dateOfBirth),
            languages: values.languages,
            is_expert_user: !!values.isExpertUser,
            is_premium_user: false,
            is_verified_user: false
        };

        axios.post('/users/signup', newUser)
            .then(res => {
                if (res && res.data) {
                    this.setState({ isModalOpen: true, modalText: res.data.message });
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    handleModalClose = () => {
        this.setState({ isModalOpen: false, modalText: '' });
    }

    render() {
        return (
            <Screen>
                <SignUpForm onSubmit={this.handleSignup} />
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleModalClose}
                >
                    <StyledText>{this.state.modalText}</StyledText>
                </Modal>
            </Screen >
        );
    }
}
