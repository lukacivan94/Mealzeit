import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../screens/SignUp/SignUp';
import HomePage from '../components/Layout/HomePage';
import EventPage from '../components/Event/EventCarousel';
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