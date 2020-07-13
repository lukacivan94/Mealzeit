import React from 'react';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import authReducer from './store/reducers/authReducer';

const reducers = {
    form: formReducer,
    auth: authReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger)));

const theme = createMuiTheme();

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