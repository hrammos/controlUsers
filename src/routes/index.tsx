import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/user" exact component={User} isPrivate />
    <Route path="/user/:id" exact component={User} isPrivate />
  </Switch>
);

export default Routes;
