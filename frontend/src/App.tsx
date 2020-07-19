import React from 'react';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import authReducer from './store/reducers/authReducer';
import setAuthToken from './utils/authToken';

/** (✓)
 * This object consists of all reducers in redux
 */
const reducers = {
    form: formReducer,
    auth: authReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

/** (✓)
 * This is for using material ui in order to use its components
 */
const theme = createMuiTheme();

/** (✓)
 * This sets token in axios headers for authentication
 */
const jwtToken = localStorage.getItem('jwtToken');
if (jwtToken) {
    setAuthToken(jwtToken);
}

/** (✓)
 * This class is main app with using redux and material-ui
 */
class App extends React.PureComponent {

    render() {

        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <Routes />
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;