import { handleActions } from 'redux-actions';
import { cloneDeep } from 'lodash';
import * as actions from './actions';
import { stateKeys } from '../../types';


const defaultState = {
  isFetching: false,
  combinations: [],
  missingCombinations: [],
  invalidCombinations: [],
  allPossibleCombinations: [],
  selectedCombination: {}
};
export default handleActions(
  {

    // COMBINATIONS
    [actions.fetchCombinationsRequested]: (state) => ({
      ...state,
      isFetching: true,
    }),
    [actions.fetchCombinationsSuccess]: (state, action) => ({
      ...state,
      combinations: action.payload,
      isFetching: false,
    }),
    [actions.fetchCombinationsFailed]: (state) => ({
      ...state,
      combinations: [],
      isFetching: false,
    }),
    // MISSING COMBINATIONS
    [actions.fetchMissingCombinationsRequested]: (state) => ({
      ...state,
      isFetching: true,
    }),
    [actions.fetchMissingCombinationsSuccess]: (state, action) => ({
      ...state,
      isFetching: false,
      missingCombinations: action.payload,
    }),
    [actions.fetchMissingCombinationsFailed]: (state) => ({
      ...state,
      missingCombinations: [],
      isFetching: false
    }),
    // ALL POSSIBLE COMBINATIONS
    [actions.fetchAllPossibleCombinationsRequested]: (state) => ({
      ...state,
      isFetching: true,
    }),
    [actions.fetchAllPossibleCombinationsSuccess]: (state, action) => ({
      ...state,
      allPossibleCombinations: action.payload,
      isFetching: false
    }),
    [actions.fetchAllPossibleCombinationsFailed]: (state) => ({
      ...state,
      allPossibleCombinations: [],
      isFetching: false
    }),
    // INVALID COMBINATIONS
    [actions.fetchInvalidCombinationsRequested]: (state) => ({
      ...state,
      isFetching: true
    }),
    [actions.fetchInvalidCombinationsSuccess]: (state, action) => ({
      invalidCombinations: action.payload,
      ...state,
      isFetching: false
    }),
    [actions.fetchInvalidCombinationsFailed]: (state) => ({
      ...state,
      invalidCombinations: [],
      isFetching: false
    }),
    [actions.selectCombination]: (state, action) => {
      return ({
        ...state,
        selectedCombination: action.payload,
      });
    },
    [actions.setSelectedCombinationText]: (state, action) => {
      const { newCombinationText } = action.payload;
      const clonedState = cloneDeep(state);

      clonedState.selectedCombination.currentTranslation = {
        ...clonedState.selectedCombination.currentTranslation,
        text: newCombinationText
      };

      return (clonedState);
    },
    [actions.addMeasureToCombination]: (state, action) => {
      const { measure } = action.payload;
      const clonedState = cloneDeep(state);

      clonedState.selectedCombination.measures.push(measure);

      return clonedState;
    },
    [actions.removeMeasureFromCombination]: (state, action) => {
      const { measure } = action.payload;
      const clonedState = cloneDeep(state);

      const indexOfObjectToRemove = clonedState.selectedCombination.measures.findIndex(m => m.id === measure.id);
      clonedState.selectedCombination.measures.splice(indexOfObjectToRemove, 1);

      return clonedState;
    }
  },
  defaultState
);
// We want to protect the default state against mutability.
export const getDefaultState = cloneDeep(defaultState); // Exporting this so that we may test it...

export const getCombinations = state => state[stateKeys.COMBINATIONS].combinations;
export const getMissingCombinations = state => state[stateKeys.COMBINATIONS].missingCombinations;
export const getInvalidCombinations = state => state[stateKeys.COMBINATIONS].invalidCombinations;
export const getAllPossibleCombinations = state => state[stateKeys.COMBINATIONS].allPossibleCombinations;

export const getSelectedCombination = state => state[stateKeys.COMBINATIONS].selectedCombination;

export const getIsFetchingCombinations = state => state[stateKeys.COMBINATIONS].isFetching;
