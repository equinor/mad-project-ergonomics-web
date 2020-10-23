import { createAction } from 'redux-actions';

// CREATE MEASURE
export const createMeasure = createAction('Measure/POST');
export const createMeasureRequested = createAction('Measure/POST_REQUESTED');
export const createMeasureSucceeded = createAction('Measure/POST_SUCCEEDED');
export const createMeasureFailed = createAction('Measure/POST_FAILED');


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

// DELETE MEASURE
export const deleteMeasure = createAction('Measure/DELETE');
export const deleteMeasureRequested = createAction('Measure/DELETE_REQUESTED');
export const deleteMeasureSucceeded = createAction('Measure/DELETE_SUCCEEDED');
export const deleteMeasureFailed = createAction('Measure/DELETE_FAILED');

// IMAGE UPLOAD (Measure)
export const uploadMeasureImage = createAction('MEASURE_IMAGE');
export const uploadMeasureImageRequested = createAction('MEASURE_IMAGE/POST_REQUESTED');
export const uploadMeasureImageSucceeded = createAction('MEASURE_IMAGE/POST_SUCCEEDED');
export const uploadMeasureImageFailed = createAction('MEASURE_IMAGE/POST_FAILED');

