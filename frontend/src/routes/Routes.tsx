import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Screen from '../components/Screen/Screen';
import Auth from '../screens/Auth/Auth';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={() => <Screen><h1>Login Page</h1></Screen>} />
            <Route path='/home' component={() => <Screen><h1>HOME Page</h1></Screen>} />
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    </Router>
);

export default Routes;