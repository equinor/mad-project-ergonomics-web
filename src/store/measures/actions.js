import { createAction } from 'redux-actions';

// FETCH MEASURE
export const fetchMeasures = createAction('Measures/GET');
export const fetchMeasuresRequested = createAction('Measures/GET_REQUESTED');
export const fetchMeasuresSucceeded = createAction('Measures/GET_SUCCEEDED');
export const fetchMeasuresFailed = createAction('Measures/GET_FAILED');

// UPDATE MEASURE TEXT
export const updateMeasureText = createAction('Measure/UpdateText');
export const updateMeasureTextRequested = createAction('MeasureText/UPDATE_Requested');
export const updateMeasureTextFailed = createAction('MeasureText/UPDATE_Failed');
export const updateMeasureTextSucceeded = createAction('MeasureText/UPDATE_Succeeded');

// IMAGE UPLOAD (Measure)
export const uploadMeasureImage = createAction('MEASURE_IMAGE');
export const uploadMeasureImageRequested = createAction('MEASURE_IMAGE/POST_REQUESTED');
export const uploadMeasureImageSucceeded = createAction('MEASURE_IMAGE/POST_SUCCEEDED');
export const uploadMeasureImageFailed = createAction('MEASURE_IMAGE/POST_FAILED');

