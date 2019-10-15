import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import withAuthorization from '../components/hoc/withAuthorization';
import { userRoles } from '../types';

// TODO - REMOVE THESE COMPONENT AND MAKE YOUR OWN
import Main from '../containers/MainPage';
import PublicFeature from '../components/public_feature/publicFeature';
import PrivateFeature from '../components/authorized_feature/authorizedFeature';

// TO PROTECT A ROUTE:
// 1. wrap component with 'withAuthorization
// 2. pass the list of allowedRoles as the second argument
// 3. sit back and enjoy your newfound level of protected-awesomeness.

const allowedRoles = [userRoles.ADMIN, userRoles.MANAGER, userRoles.USER];

export default () => (
  <Switch>
    <Route exact path="/" component={withRouter(Main)} />
    <Route exact path="/public-feature" component={withRouter(PublicFeature)} />
    <Route exact path="/authorized-feature" component={withAuthorization(withRouter(PrivateFeature), allowedRoles)} />
    <Route exact path="/unauthorized-feature" component={withAuthorization(withRouter(PrivateFeature), [])} />
  </Switch>
);
