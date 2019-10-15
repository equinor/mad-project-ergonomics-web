import { handleActions } from 'redux-actions';
import { authStatusTypes, userRoles } from '../../types';
import * as actions from './authActions';

const defaultState = {
  auth: {
    user: null,
    role: userRoles.UNKNOWN,
    authStatus: authStatusTypes.NOT_AUTHENTICATED,
  },
};

export default handleActions({
  [actions.loginRequested]: state => ({
    ...state,
    auth: {
      ...state.user,
      role: userRoles.UNKNOWN,
      authStatus: authStatusTypes.AUTHENTICATING,
    },
  }),
  [actions.loginSucceeded]: (state, action) => ({
    ...state,
    auth: {
      user: action.payload.auth.user,
      role: userRoles.ADMIN,
      authStatus: authStatusTypes.AUTHENTICATED,
    },
  }),
  [actions.loginFailed]: state => ({
    ...state,
    auth: {
      ...state.user,
      role: userRoles.UNKNOWN,
      authStatus: authStatusTypes.FAILED,
    },
  }),

  [actions.loginReset]: state => ({
    ...state,
    auth: {
      ...state.user,
      role: userRoles.UNKNOWN,
      authStatus: authStatusTypes.SIGNED_OUT,
    },
  }),
}, defaultState);
