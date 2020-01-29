import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [actions.fetchMeasuresRequested]: state => ({
      ...state,
      isFetching: true,
    }),
    [actions.fetchMeasuresSucceeded]: (state, action) => ({
      ...state,
      measures: action.payload,
      isFetching: false,
    }),
    [actions.fetchMeasuresFailed]: state => ({
      ...state,
      isFetching: false,
    }),
  },
  {
    measures: [],
    isFetching: false,
  }
);

export const getMeasures = state => state[stateKeys.MEASURES].measures;

export const getIsFetchingMeasures = state => state[stateKeys.MEASURES].isFetching;
