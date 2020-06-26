import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Screen from '../components/Screen/Screen';
import SignUp from '../screens/SignUp/SignUp';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/sign-up' component={SignUp} />
            <Route path='/home' component={() => <Screen><h1>HOME Page</h1></Screen>} />
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    </Router>
);

export default Routes;