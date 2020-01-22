import { stateKeys } from '../../types';
import reducer, { getDefaultState, getSelectedCombination } from './reducer';
import { selectCombination } from './actions';

const defaultState = getDefaultState;
let state = {
  [stateKeys.COMBINATIONS]: {},
};

function updateState(action) {
  state = {
    [stateKeys.COMBINATIONS]: reducer(state, action), // Todo: What happened here? only state in the reducer?
  };
}

const mockedCombinations = [
  {
    'id': 86,
    'currentTranslation': null,
    'measures': [],
    'suggestedTranslation': null,
    'keyId': '256-258',
    'answerIds': [256, 258],
    'keyNumber': '1A-2A',
    'risk': 'Green',
    'graphic': null
  },
  {
    'id': 87,
    'currentTranslation': null,
    'measures': [
      {
        'id': 77,
        'currentTranslation': null,
        'suggestedTranslation': null,
        'graphic': null
      },
      {
        'id': 78,
        'currentTranslation': null,
        'suggestedTranslation': null,
        'graphic': null
      },
      {
        'id': 79,
        'currentTranslation': null,
        'suggestedTranslation': null,
        'graphic': null
      }
    ],
    'suggestedTranslation': null,
    'keyId': '257-258',
    'keyNumber': '1B-2A',
    'risk': 'Yellow',
    'graphic': null
  },
  {
    'id': 88,
    'currentTranslation': null,
    'measures': [],
    'suggestedTranslation': null,
    'keyId': '256-259',
    'keyNumber': '1A-2B',
    'risk': 'Green',
    'graphic': null
  },
  {
    'id': 89,
    'currentTranslation': null,
    'measures': [
      {
        'id': 77,
        'currentTranslation': null,
        'suggestedTranslation': null,
        'graphic': null
      },
      {
        'id': 78,
        'currentTranslation': null,
        'suggestedTranslation': null,
        'graphic': null
      },
      {
        'id': 79,
        'currentTranslation': null,
        'suggestedTranslation': null,
        'graphic': null
      },
      {
        'id': 80,
        'currentTranslation': null,
        'suggestedTranslation': null,
        'graphic': null
      }
    ],
    'suggestedTranslation': null,
    'keyId': '257-259',
    'keyNumber': '1B-2B',
    'risk': 'Red',
    'graphic': null
  }
];

describe('Combinations => actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.CHALLENGES]: { ...defaultState } };
  });

  it('can set combinations for a challenge', () => {
    console.warn('Please write some tests...');
    expect(true)
      .toBe(false);
  });
  // todo: Write proper tests

  it('can select a combination', () => {
    const action = selectCombination(mockedCombinations[0]);
    updateState(action);
    expect(getSelectedCombination(state))
      .toEqual(mockedCombinations[0]);
  });

  it('can replace the selected combination ', () => {
    let action = selectCombination(mockedCombinations[0]);
    updateState(action);
    expect(getSelectedCombination(state))
      .toEqual(mockedCombinations[0]);
    action = selectCombination(mockedCombinations[1]);
    updateState(action);
    expect(getSelectedCombination(state))
      .toEqual(mockedCombinations[1]);
  });

});
