import { createAction } from 'redux-actions';


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
