import React, { Component } from 'react';
import Screen from '../../components/Screen/Screen';
import SignUpForm from '../SignUp/SignUpForm';
import axios from '../../axios';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import { History, LocationState } from 'history';

/** (✓)
 * These are styled components for customizing styles
 */
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

const StyledDiv = styled.div`
    height: 100%;
    width: 100%;
    display: block;
    flex-drection: column;
    align-items: center;
    background-color: transparent;
    margin: 50px 50px 0 50px;
`;

const WrapperDiv = styled.div`
    padding-top: 60px;
    margin: 0 auto;
    font-family: 'Source Sans Pro', sans-serif;
`;

interface SignupState {
    isModalOpen: boolean;
    modalText: string;
    image: string;
}

interface SignupProps {
    history: History<LocationState>;
}

/** (✓)
 * This class handles sign-up
 */

export default class Signup extends Component<SignupProps, SignupState> {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalText: '',
            image: ''
        };
    }

    /** (✓)
     * This function handles signup and calls axios post request
     * After successful call , it opens a modal for success message
     */

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
            is_verified_user: false,
            profile_picture: this.state.image
        };

        axios.post('/users/signup', newUser)
            .then(res => {
                if (res && res.data) {
                    this.setState({ isModalOpen: true, modalText: res.data.message, image: '' });
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

    /** (✓)
     * This function handles modal close and navigates to sign in afterwards
     */
    handleModalClose = () => {
        this.setState({ isModalOpen: false, modalText: '' }, () => {
            this.props.history.push('/sign-in');
        });
    }

    /** (✓)
     * This function save base64 string to state
     */
    handleImage = (base64Image) => {
        this.setState({ image: base64Image });
    }

    /** (✓)
     * Render method consists of SignUpForm and Modal for fail signup request
     */
    render() {
        return (
            <Screen>
                <StyledDiv>
                    <WrapperDiv>
                        <SignUpForm onSubmit={this.handleSignup} handleImage={this.handleImage} />
                        <Modal
                            open={this.state.isModalOpen}
                            onClose={this.handleModalClose}
                        >
                            <StyledText>{this.state.modalText}</StyledText>
                        </Modal>
                    </WrapperDiv>
                </StyledDiv>
            </Screen >
        );
    }
}
