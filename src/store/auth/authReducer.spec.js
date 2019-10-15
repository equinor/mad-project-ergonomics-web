import reducer from './authReducer';
import * as actions from './authActions';
import * as selectors from '../selectors';
import { authStatusTypes, stateKeys, userRoles } from '../../types';

const defaultState = {
  user: null,
  role: userRoles.UNKNOWN,
  authStatus: authStatusTypes.NOT_AUTHENTICATED,
};
const testUserData = {

};

let state;

it('sets the correct auth statuses and user object', () => {
  state = {
    [stateKeys.AUTH]: { ...defaultState },
  };

  expect(state).toEqual({
    [stateKeys.AUTH]: {
      user: null,
      role: userRoles.UNKNOWN,
      authStatus: authStatusTypes.NOT_AUTHENTICATED,
    },
  });

  let action = actions.loginRequested();
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(selectors.getAuthStatus(state)).toBe(authStatusTypes.AUTHENTICATING);
  expect(selectors.getCurrentUser(state)).toBeUndefined();

  action = actions.loginRequested();
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(selectors.getAuthStatus(state)).toBe(authStatusTypes.NOT_AUTHENTICATED);

  action = actions.loginSucceeded(testUserData);
  state = {
    [stateKeys.AUTH]: reducer(state.auth, action),
  };
  expect(selectors.getAuthStatus(state)).toBe(authStatusTypes.AUTHENTICATED);
  expect(selectors.getCurrentUser(state)).toEqual({ ...testUserData });

  action = actions.loginFailed();
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(selectors.getAuthStatus(state)).toBe(authStatusTypes.FAILED);

  action = actions.loginReset();
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(selectors.getAuthStatus(state)).toBe(authStatusTypes.SIGNED_OUT);
});
