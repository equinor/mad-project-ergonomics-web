import * as actions from './actions';
import { stateKeys } from '../../types';
import reducer, { getIsFetchingMeasures, getMeasures } from './reducer';
import { Measures as MockedMeasures } from '../../mockData/mock-data.json';

const defaultState = {
  measures: [],
  isFetching: false,
};
let state = {
  [stateKeys.MEASURES]: {},
};

function updateState(action) {
  state = {
    [stateKeys.MEASURES]: reducer(state.measures, action),
  };
}

describe('Measures actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.MEASURES]: { ...defaultState } };
  });

  it('should fetch measures, changing the fetching status accordingly and ultimately succeed', () => {
    updateState(actions.fetchMeasuresRequested());
    expect(getIsFetchingMeasures(state))
      .toBe(true);

    updateState(actions.fetchMeasuresSucceeded(MockedMeasures));
    expect(getIsFetchingMeasures(state))
      .toBe(false);
    expect(getMeasures(state))
      .toEqual(MockedMeasures);
  });

  it('should not alter the state of measures if a fetch fails, and the isFetching status should update accordingly', () => {
    updateState(actions.fetchMeasuresSucceeded(MockedMeasures));
    expect(getIsFetchingMeasures(state))
      .toBe(false);

    updateState(actions.fetchMeasuresRequested());
    expect(getIsFetchingMeasures(state))
      .toBe(true);

    updateState(actions.fetchMeasuresFailed());
    expect(getIsFetchingMeasures(state))
      .toBe(false);
    expect(getMeasures(state))
      .toEqual(MockedMeasures);
  });
});
