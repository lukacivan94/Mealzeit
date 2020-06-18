import React from 'react';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const reducers = {
    form: formReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger)));

class App extends React.PureComponent {

    render() {

        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

export default App;