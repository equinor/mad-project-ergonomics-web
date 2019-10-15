import { stateKeys } from '../../types';

const getAuthState = state => state[stateKeys.AUTH];

export const getAuth = state => getAuthState(state).auth;
export const getCurrentUser = state => getAuthState(state).auth.user;
export const getAuthStatus = state => getAuthState(state).auth.authStatus;
