import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth/authReducer';
import manifestReducer from './manifest';
import versionReducer from './version/versionReducer';
import changelogReducer from './changelog/changelogReducer';
import { stateKeys } from '../types';

export default combineReducers({
  [stateKeys.MANIFEST]: manifestReducer,
  [stateKeys.AUTH]: authReducer,
  [stateKeys.VERSION]: versionReducer,
  [stateKeys.CHANGELOG]: changelogReducer,
  [stateKeys.NAV]: routerReducer,
});
