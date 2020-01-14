import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [actions.fetchLabelsRequested]: state => ({
      ...state,
      isFetching: true,
    }),
    [actions.fetchLabelsSucceeded]: (state, action) => ({
      ...state,
      labels: action.payload,
      isFetching: false,
    }),
    [actions.fetchLabelsFailed]: state => ({
      ...state,
      isFetching: false,
    }),
  },
  {
    labels: {
      frontPageTitle: { text: 'Ergonomic calculator' },
      frontPageDescription: { text: '...' },
    },
    isFetching: false,
  }
);

export const getLabels = state => state[stateKeys.LABELS].labels;

export const getIsFetchingLabels = state => state[stateKeys.LABELS].isFetching;
