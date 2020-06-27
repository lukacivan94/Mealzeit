import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Screen from '../components/Screen/Screen';
import SignUp from '../screens/SignUp/SignUp';
import HomePage from '../components/Layout/HomePage';
import EventPage from '../components/Event/EventCarousel';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/' component={() => <Screen><h1>Login Page</h1></Screen>} />
            <Route path='/home' component={() => <HomePage />} />
            <Route path='/event' component={() => <EventPage />} />
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    </Router>
);

export default Routes;