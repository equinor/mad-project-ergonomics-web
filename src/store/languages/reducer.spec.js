import * as actions from './actions';
import { stateKeys } from '../../types';
import reducer, { getCurrentLanguage, getLanguages, isFetching } from './reducer';
import { Languages as MockedLanguages } from '../../mockData/mock-data.json';

const defaultState = {
  languages: [],
  currentLanguage: null,
  isFetching: false,
};
let state = {
  [stateKeys.LANGUAGES]: {},
};

function updateState(action) {
  state = {
    [stateKeys.LANGUAGES]: reducer(state.languages, action),
  };
}

describe('Languages actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.LANGUAGES]: { ...defaultState } };
  });

  it('should fetch languages, update the fetching status accordingly and ultimately succeed', () => {
    updateState(actions.fetchLanguagesRequested());
    expect(isFetching(state))
      .toBe(true);

    updateState(actions.fetchLanguagesSucceeded(MockedLanguages));
    expect(isFetching(state))
      .toBe(false);
    expect(getLanguages(state))
      .toEqual(MockedLanguages);
  });

  it('should not alter the state of languages if a fetch fails, and the isFetching status should update accordingly', () => {
    updateState(actions.fetchLanguagesSucceeded(MockedLanguages));
    expect(isFetching(state))
      .toBe(false);

    updateState(actions.fetchLanguagesRequested());
    expect(isFetching(state))
      .toBe(true);

    updateState(actions.fetchLanguagesFailed());
    expect(isFetching(state))
      .toBe(false);
    expect(getLanguages(state))
      .toEqual(MockedLanguages);
  });

  it('should set and retrieve the current language', () => {
    MockedLanguages.forEach(language => {
      updateState(actions.setLanguageSucceeded(language));
      expect(getCurrentLanguage(state))
        .toBe(language);
    });
  });
});
