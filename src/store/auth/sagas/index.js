import {
  call,
  take,
} from 'redux-saga/effects';
import * as actions from '../authActions';
import config from '../../../mockData/mock-config';

// Use mocked auth flow if mocked authentication is enabled in mock-config.js.
// If mocked auth is used, you can change the user object in the mock-config.js
const { authenticateFlow, signOutFlow } = (config.enabled && config.mockAuthentication) ?
  require('./mockedAuthFlow') :
  require('./authFlow');

export default function* watchAuthentication() {
  while(true) { // eslint-disable-line
    try {
      const loginAction = yield take(`${actions.login}`);
      yield call(authenticateFlow, loginAction);

      const signOutAction = yield take(`${actions.loginSignOut}`);

      yield call(signOutFlow, signOutAction);
    } catch (e) {
      // console.warn('login flow failed');
    }
  }
}
