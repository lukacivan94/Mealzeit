import { Reducer } from 'redux';

import { AUTH_ACTION_TYPE } from '../actions/authActions';

const initialState = {
    isLoggedIn: false
};

const reducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ACTION_TYPE.LOGIN: {
            return { ...state, isLoggedIn: true };
        }
        case AUTH_ACTION_TYPE.LOGOUT: {
            return { ...state, isLoggedIn: false };
        }
        default:
            return state;
    }
};

export default reducer;