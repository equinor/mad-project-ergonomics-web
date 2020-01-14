import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [actions.fetchLanguagesRequested]: state => ({
      ...state,
      isFetching: true,
    }),
    [actions.fetchLanguagesSucceeded]: (state, action) => ({
      ...state,
      languages: action.payload,
      isFetching: false,
    }),
    [actions.fetchLanguagesFailed]: state => ({
      ...state,
      isFetching: false,
    }),
    [actions.setLanguageSucceeded]: (state, action) => ({
      ...state,
      currentLanguage: action.payload,
      isFetching: false,
    }),
  },

  {
    languages: [],
    currentLanguage: {
      'id': 9,
      'code': 'NO',
      'name': 'Norwegian'
    },
    isFetching: false,
  }
);

export const getLanguages = state => state[stateKeys.LANGUAGES].languages;

export const isFetching = state => state[stateKeys.LANGUAGES].isFetching;

export const getCurrentLanguage = state => state[stateKeys.LANGUAGES].currentLanguage;
