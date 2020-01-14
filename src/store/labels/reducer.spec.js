import * as actions from './actions';
import { stateKeys } from '../../types';
import reducer, { getIsFetchingLabels, getLabels } from './reducer';
import { Labels as MockedLabels } from '../../mockData/mock-data.json';

const defaultState = {
  labels: { frontPageTitle: { text: 'Title' }, frontPageDescription: { text: 'Description' } },
  isFetching: false,
};
let state = {
  [stateKeys.LABELS]: {},
};

function updateState(action) {
  state = {
    [stateKeys.LABELS]: reducer(state.labels, action),
  };
}

describe('Labels actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.LABELS]: { ...defaultState } };
  });

  it('should fetch labels, changing the fetching status accordingly and ultimately succeed', () => {
    updateState(actions.fetchLabelsRequested());
    expect(getIsFetchingLabels(state))
      .toBe(true);

    updateState(actions.fetchLabelsSucceeded(MockedLabels));
    expect(getIsFetchingLabels(state))
      .toBe(false);
    expect(getLabels(state))
      .toEqual(MockedLabels);
  });

  it('should not alter the state of labels if a fetch fails, and the isFetching status should update accordingly', () => {
    updateState(actions.fetchLabelsSucceeded(MockedLabels));
    expect(getIsFetchingLabels(state))
      .toBe(false);

    updateState(actions.fetchLabelsRequested());
    expect(getIsFetchingLabels(state))
      .toBe(true);

    updateState(actions.fetchLabelsFailed());
    expect(getIsFetchingLabels(state))
      .toBe(false);
    expect(getLabels(state))
      .toEqual(MockedLabels);
  });
});
