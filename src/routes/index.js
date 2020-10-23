import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import withAuthorization from '../components/hoc/withAuthorization';
import { userRoles } from '../types';
import Main from '../containers/MainPage';
import Measures from '../containers/Measures';
import EditMeasure from '../containers/editMeasure';

// TO PROTECT A ROUTE:
// 1. wrap component with 'withAuthorization
// 2. pass the list of allowedRoles as the second argument
// 3. sit back and enjoy your newfound level of protected-awesomeness.

const allowedRoles = [userRoles.ADMIN, userRoles.MANAGER, userRoles.USER];

export default () => (
  <Switch>
    <Route exact path="/" component={withAuthorization(withRouter(Main), allowedRoles)}/>
    <Route exact path="/measures"
           component={withAuthorization(withRouter(Measures), allowedRoles)}/>
    <Route exact path="/measure/:id"
           component={withAuthorization(withRouter(EditMeasure), allowedRoles)}/>
  </Switch>
);
