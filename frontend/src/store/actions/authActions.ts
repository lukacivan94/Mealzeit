export enum AUTH_ACTION_TYPE {
    SIGNUP = '@@auth/SIGNUP',
    LOGIN = '@@auth/LOGIN',
    LOGOUT = '@@auth/LOGOUT'
}

export const login = () => ({
    type: AUTH_ACTION_TYPE.LOGIN
});

export const logout = () => ({
    type: AUTH_ACTION_TYPE.LOGOUT
});