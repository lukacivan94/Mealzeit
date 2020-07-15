export enum AUTH_ACTION_TYPE {
    SIGNUP = '@@auth/SIGNUP',
    LOGIN = '@@auth/LOGIN',
    LOGOUT = '@@auth/LOGOUT'
}

export const login = (userId) => ({
    type: AUTH_ACTION_TYPE.LOGIN,
    payload: userId
});

export const logout = () => ({
    type: AUTH_ACTION_TYPE.LOGOUT
});