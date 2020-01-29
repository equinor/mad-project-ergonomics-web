import { createAction } from 'redux-actions';

export const addMeasureToCombination = createAction('Combination/ADD_MEASURE');
export const addMeasureToCombinationRequested = createAction('Combination/ADD_MEASURE-Requested');
export const addMeasureToCombinationSucceeded = createAction('Combination/ADD_MEASURE-Succeeded');
export const addMeasureToCombinationFailed = createAction('Combination/ADD_MEASURE-Failed');

export const removeMeasureFromCombination = createAction('Combination/REMOVE_MEASURE');
export const removeMeasureFromCombinationRequested = createAction('Combination/REMOVE_MEASURE-Requested');
export const removeMeasureFromCombinationSucceeded = createAction('Combination/REMOVE_MEASURE-Succeeded');
export const removeMeasureFromCombinationFailed = createAction('Combination/REMOVE_MEASURE-Failed');

export const fetchCombinations = createAction('Combinations/GET');
export const fetchCombinationsRequested = createAction('Combinations/GET_Requested');
export const fetchCombinationsSuccess = createAction('Combinations/GET_Success');
export const fetchCombinationsFailed = createAction('Combinations/GET_FAILED');

export const fetchMissingCombinations = createAction('Combinations/GET_Missing');
export const fetchMissingCombinationsRequested = createAction('Combinations/GET_Missing_Requested');
export const fetchMissingCombinationsSuccess = createAction('Combinations/GET_Missing_Success');
export const fetchMissingCombinationsFailed = createAction('Combinations/GET_Missing_FAILED');

export const fetchInvalidCombinations = createAction('Combinations/GET_Invalid');
export const fetchInvalidCombinationsRequested = createAction('Combinations/GET_Invalid_Requested');
export const fetchInvalidCombinationsSuccess = createAction('Combinations/GET_Invalid_Success');
export const fetchInvalidCombinationsFailed = createAction('Combinations/GET_Invalid_FAILED');

export const fetchAllPossibleCombinations = createAction('Combinations/GET_AllPossible');
export const fetchAllPossibleCombinationsRequested = createAction('Combinations/GET_AllPossible_Requested');
export const fetchAllPossibleCombinationsSuccess = createAction('Combinations/GET_AllPossible_Success');
export const fetchAllPossibleCombinationsFailed = createAction('Combinations/GET_AllPossible_FAILED');

export const selectCombination = createAction('Combinatin/Set_current');


export const creatOrUpdateCombination = createAction('Combination_CreateOrUpdate');
export const creatOrUpdateCombinationRequested = createAction('Combination_CreateOrUpdate/POST_Requested');
export const creatOrUpdateCombinationSuccess = createAction('Combination_CreateOrUpdate/POST_Success');
export const creatOrUpdateCombinationFailed = createAction('Combination_CreateOrUpdate/POST_Failed');


export const setSelectedCombinationText = createAction('Combination_TEXT/Local_update');
export const setSelectedCombinationTextRequested = createAction('Combination_TEXT/PATCH_REQUESTED');
export const setSelectedCombinationTextSucceeded = createAction('Combination_TEXT/PATCH_SUCCEEDED');
export const setSelectedCombinationTextFailed = createAction('Combination_TEXT/PATCH_FAILED');


