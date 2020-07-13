import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../screens/SignUp/SignUp';
import HomePage from '../screens/Home/HomePage';
import EventPage from '../screens/Event/EventsPages';
import Auth from '../screens/Auth/Auth';
import Recipe from '../screens/Recipe/Recipe';
import BrowsePage from '../screens/Browse/BrowsePage';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={() => <HomePage />} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/sign-in' component={Auth} />
            <Route path='/event' component={() => <EventPage />} />
            <Route path='/recipe' component={() => <Recipe />} />
            <Route path='/browse' component={() => <BrowsePage />} />
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    </Router>
);

export default Routes;