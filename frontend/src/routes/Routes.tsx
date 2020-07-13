import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Screen from '../components/Screen/Screen';
import HomePage from '../screens/Home/HomePage';
import EventPage from '../screens/Event/EventsPages';
import Auth from '../screens/Auth/Auth';


const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/sign-in' component={Auth} />
            <Route path='/' component={() => <HomePage />} />
            <Route path='/event' component={() => <EventPage />} />
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    </Router>
);

export default Routes;