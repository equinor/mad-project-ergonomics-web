import { createAction } from 'redux-actions';


export const fetchLanguages = createAction('Languages/GET');
export const fetchLanguagesRequested = createAction('Languages/GET_REQUESTED');
export const fetchLanguagesSucceeded = createAction('Languages/GET_SUCCEEDED');
export const fetchLanguagesFailed = createAction('Languages/GET_FAILED');

export const setLanguage = createAction('Language/SET');
export const setLanguageSucceeded = createAction('Language/SET_SUCCESS');
export const setLanguageFailed = createAction('Language/SET_FAIL');
