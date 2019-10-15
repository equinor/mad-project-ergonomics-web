import reducer from './changelogReducer';
import * as actions from './changelogActions';
import { ReleaseNotes } from '../../mockData/mock-data.json';
import { stateKeys } from '../../types';
import * as selectors from '../selectors';

const defaultState = { content: {}, fetching: false };
let state = {
  [stateKeys.CHANGELOG]: {},
};
describe('fetch changelog actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.CHANGELOG]: { ...defaultState } };
  });

  it('should have the correct default state', () => {
    expect(state).toEqual({
      [stateKeys.CHANGELOG]: {
        content: {},
        fetching: false,
      },
    });
  });

  it('should set fetching to true when fetch changelog is requested and reset if it fails', () => {
    let action = actions.fetchChangelogRequested();
    state = {
      [stateKeys.CHANGELOG]: reducer(state.releaseNote, action),
    };
    expect(selectors.selectChangeLog(state)).toEqual({});
    expect(selectors.isFetching(state)).toBe(true);
    action = actions.fetchChangelogFailed();
    state = {
      [stateKeys.CHANGELOG]: reducer(state.releaseNote, action),
    };
    expect(selectors.isFetching(state)).toBe(false);
    expect(selectors.selectChangeLog(state)).toEqual({});
  });

  it('should set the correct state and the selectors should return the correct values after fetch is successful', () => {
    let action = actions.fetchChangelogRequested();
    state = {
      [stateKeys.CHANGELOG]: reducer(state.releaseNote, action),
    };
    action = actions.fetchChangelogSucceeded(ReleaseNotes);
    state = {
      [stateKeys.CHANGELOG]: reducer(state.releaseNote, action),
    };
    expect(selectors.isFetching(state)).toBe(false);
    expect(selectors.selectChangeLog(state)).toEqual(ReleaseNotes);
  });
});
