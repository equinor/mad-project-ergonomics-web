import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import withAuthorization from '../components/hoc/withAuthorization';
import { userRoles } from '../types';
import Main from '../containers/MainPage';

// TO PROTECT A ROUTE:
// 1. wrap component with 'withAuthorization
// 2. pass the list of allowedRoles as the second argument
// 3. sit back and enjoy your newfound level of protected-awesomeness.

const allowedRoles = [userRoles.ADMIN, userRoles.MANAGER, userRoles.USER];

export default () => (
  <Switch>
    <Route exact path="/" component={withAuthorization(withRouter(Main), allowedRoles)} />
  </Switch>
);
