import { stateKeys } from '../../types';
import reducer, { getCombinations, getSelectedCombination } from './reducer';
import * as actions from './actions';

const defaultState = {
  isFetching: false,
  combinations: [],
  missingCombinations: [],
  invalidCombinations: [],
  allPossibleCombinations: [],
  selectedCombination: {}
};
let state = {
  [stateKeys.COMBINATIONS]: {},
};


function updateState(action) {
  state = {
    [stateKeys.COMBINATIONS]: reducer(state.combinations, action),
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
    state = { [stateKeys.COMBINATIONS]: { ...defaultState } };
  });


  it('can set combinations for a challenge', () => {
    const action = actions.fetchCombinationsSuccess(mockedCombinations);
    updateState(action);

    expect(getCombinations(state))
      .toEqual(mockedCombinations);

  });

  it('can select a combination', () => {
    const action = actions.selectCombination(mockedCombinations[0]);
    updateState(action);
    expect(getSelectedCombination(state))
      .toEqual(mockedCombinations[0]);
  });

  it('can replace the selected combination ', () => {
    let action = actions.selectCombination(mockedCombinations[0]);
    updateState(action);
    expect(getSelectedCombination(state))
      .toEqual(mockedCombinations[0]);
    action = actions.selectCombination(mockedCombinations[1]);
    updateState(action);
    expect(getSelectedCombination(state))
      .toEqual(mockedCombinations[1]);
  });

  it('can change text of selectedCombination', () => {
    // updateState(actions.fetchCombinationsSuccess(mockedCombinations));
    // expect(getCombinations(state))
    //   .toEqual(mockedCombinations);

    updateState(actions.selectCombination(mockedCombinations[0]));
    expect(getSelectedCombination(state))
      .toEqual(mockedCombinations[0]);

    // const combinationToUpdate = mockedCombinations[0];
    const newCombinationText = 'Jysla tunge løft krever at du passer godt på ryggen. Lat som at du er en robot. Det pleier å hjelpe på arbeidsmoralen.';

    // const combinationId = combinationToUpdate.id;
    updateState(actions.setSelectedCombinationText({
       newCombinationText
    }));

    expect(getSelectedCombination(state).currentTranslation.text)
      .toEqual(newCombinationText);

  });

  it('can change text on selectedCombination', () => {

  });

});
