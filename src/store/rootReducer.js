import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth/authReducer';
import manifestReducer from './manifest';
import versionReducer from './version/versionReducer';
import changelogReducer from './changelog/changelogReducer';
import { stateKeys } from '../types';
import languagesReducer from './languages/reducer';
import challengesReducer from './challenges/reducer';
import categoriesReducer  from './categories/reducer';
import labelsReducer from './labels/reducer';
import questionsReducer from './questions/reducer';
import appSettingsReducer from './appSettings/reducer';
import combinationsReducer from './combinations/reducer';
import measuresReducer from './measures/reducer';

export default combineReducers({
  [stateKeys.MANIFEST]: manifestReducer,
  [stateKeys.AUTH]: authReducer,
  [stateKeys.VERSION]: versionReducer,
  [stateKeys.CHANGELOG]: changelogReducer,
  [stateKeys.NAV]: routerReducer,
  [stateKeys.LANGUAGES]: languagesReducer,
  [stateKeys.CHALLENGES]: challengesReducer,
  [stateKeys.CATEGORIES]: categoriesReducer,
  [stateKeys.QUESTIONS]: questionsReducer,
  [stateKeys.LABELS]: labelsReducer,
  [stateKeys.AppSettings]: appSettingsReducer,
  [stateKeys.COMBINATIONS]: combinationsReducer,
  [stateKeys.MEASURES]: measuresReducer,
});
