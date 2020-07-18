import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from '../screens/SignUp/SignUp';
import HomePage from '../screens/Home/HomePage';
import Course from '../screens/Event/Course';
import CookRoom from '../screens/Event/CookRoom';
import Auth from '../screens/Auth/Auth';
import Recipe from '../screens/Recipe/Recipe';
import BrowsePage from '../screens/Browse/BrowsePage';
import Profile from '../screens/Profile/Profile';
import About from '../screens/About/About';
import MissionVision from '../screens/About/Mission';

const token = localStorage.getItem('jwtToken');

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/sign-in' component={Auth} />
            <PrivateRoute path='/course' component={Course} />
            <PrivateRoute path='/cookroom' component={CookRoom} />
            <PrivateRoute path='/recipe' component={Recipe} />
            <Route path='/browse' component={BrowsePage} />
            <PrivateRoute path='/profile' component={Profile} />
            <Route path='/about' component={About} />
            <Route path='/mission' component={MissionVision} />
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    </Router>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => !!token
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />}
        />
    );
};

export default Routes;