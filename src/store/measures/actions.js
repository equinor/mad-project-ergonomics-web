import { createAction } from 'redux-actions';

export const fetchMeasures = createAction('Measures/GET');
export const fetchMeasuresRequested = createAction('Measures/GET_REQUESTED');
export const fetchMeasuresSucceeded = createAction('Measures/GET_SUCCEEDED');
export const fetchMeasuresFailed = createAction('Measures/GET_FAILED');
