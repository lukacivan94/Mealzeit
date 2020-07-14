import { Reducer } from 'redux';

import { AUTH_ACTION_TYPE } from '../actions/authActions';

const initialState = {
    isLoggedIn: false,
    userId: ''
};

const reducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ACTION_TYPE.LOGIN: {
            return { ...state, isLoggedIn: true, userId: action.payload };
        }
        case AUTH_ACTION_TYPE.LOGOUT: {
            return { ...state, isLoggedIn: false, userId: '' };
        }
        default:
            return state;
    }
};

export default reducer;