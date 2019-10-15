import { createAction } from 'redux-actions';
import { authStatusTypes, userRoles } from '../../types';

/**
 * User
 */
export const setCurrentUser = createAction('User/CURRENT_SET');

/**
 * Authentication
 */
export const login = createAction('Login/AUTH');
export const loginRequested = createAction('Login/AUTH_REQUESTED');
export const loginSucceeded = createAction('Login/AUTH_SUCCEEDED', user => ({
  auth: {
    user,
    role: userRoles.UNKNOWN,
    authStatus: authStatusTypes.AUTHENTICATED,
  },
}));
export const loginFailed = createAction('Login/AUTH_FAILED');
export const loginSignOut = createAction('Login/SIGN_OUT');
export const loginReset = createAction('Login/AUTH_RESET');
