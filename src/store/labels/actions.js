import { createAction } from 'redux-actions';

export const fetchLabels = createAction('Labels/GET');
export const fetchLabelsRequested = createAction('Labels/GET_REQUESTED');
export const fetchLabelsSucceeded = createAction('Labels/GET_SUCCEEDED');
export const fetchLabelsFailed = createAction('Labels/GET_FAILED');
