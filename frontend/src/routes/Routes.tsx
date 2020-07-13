import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../screens/SignUp/SignUp';
import HomePage from '../screens/Home/HomePage';
import EventPage from '../screens/Event/EventsPages';
import Auth from '../screens/Auth/Auth';
import BrowsePage from '../components/BrowsePage';


const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/sign-in' component={Auth} />
            <Route exact path='/' component={() => <HomePage />} />
            <Route path='/browse' component={() => <EventPage />} />
            <Route path='/event' component={() => <BrowsePage />} />
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    </Router>
);

export default Routes;