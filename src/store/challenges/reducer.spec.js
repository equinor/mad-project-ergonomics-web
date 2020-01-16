import * as actions from './actions';
import { stateKeys } from '../../types';
import reducer, { getChallenges, getIsFetchingChallenges, getSelectedChallenge } from './reducer';
import {
  Challenges as MockedChallenges,
  ChallengesWithoutTranslation as ChallengesNoTranslation
} from '../../mockData/mock-data.json';

const defaultState = { challenges: [], loading: false };
let state = {
  [stateKeys.CHALLENGES]: {},
};

function updateState(action) {
  state = {
    [stateKeys.CHALLENGES]: reducer(state.challenges, action),
  };
}

describe('Challenges actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.CHALLENGES]: { ...defaultState } };
  });

  it('should fetch challenges, changing the fetching status accordingly and ultimately succeed', () => {
    updateState(actions.fetchChallengesRequested());
    expect(getIsFetchingChallenges(state))
      .toBe(true);

    updateState(actions.fetchChallengesSucceeded(MockedChallenges));
    expect(getIsFetchingChallenges(state))
      .toBe(false);
    expect(getChallenges(state))
      .toEqual(MockedChallenges);
  });

  it('should not alter the state of challenges if a fetch fails, and the getIsFetchingChallenges status should update accordingly', () => {
    updateState(actions.fetchChallengesSucceeded(MockedChallenges));
    expect(getIsFetchingChallenges(state))
      .toBe(false);

    updateState(actions.fetchChallengesRequested());
    expect(getIsFetchingChallenges(state))
      .toBe(true);

    updateState(actions.fetchChallengesFailed());
    expect(getIsFetchingChallenges(state))
      .toBe(false);
    expect(getChallenges(state))
      .toEqual(MockedChallenges);
  });

  it('should select a challenge', () => {
    updateState(actions.fetchChallengesSucceeded(MockedChallenges));

    MockedChallenges.forEach(challenge => {
      updateState(actions.selectChallenge(challenge));
      expect(getSelectedChallenge(state))
        .toStrictEqual({ ...challenge, isSelected: true });
    });
  });

  it('Remembers what challenge is selected when fetching new challenges', () => {
    MockedChallenges.forEach(challenge => {
      updateState(actions.fetchChallengesSucceeded(MockedChallenges));
      updateState(actions.selectChallenge(challenge));
      expect(getSelectedChallenge(state))
        .toStrictEqual({ ...challenge, isSelected: true });
    });


  });

  it('can reorder challenges', () => {
      updateState(actions.fetchChallengesSucceeded(MockedChallenges));

      expect(getChallenges(state)[0])
        .toEqual(MockedChallenges[0]);

      // Moving the first challenge one down
      let oldIndex = 0;
      let newIndex = 1;
      updateState(actions.reorderChallengesState({ oldIndex, newIndex }));

      expect(getChallenges(state)[1])
        .toEqual(MockedChallenges[0]);

      // Move the second (mocked) challenge to the end (currently first in the state)
      // then
      // The mockedChallenge[0] should now be first again in the state
      oldIndex = 0;
      newIndex = MockedChallenges.length - 1;
      updateState(actions.reorderChallengesState({ oldIndex, newIndex }));
      expect(getChallenges(state)[0])
        .toEqual(MockedChallenges[0]);
      // And the moved challenge should be last...
      expect(getChallenges(state)[newIndex])
        .toEqual(MockedChallenges[1]);
    }
  );

  it('can change title of challenge', () => {
    updateState(actions.fetchChallengesSucceeded(MockedChallenges));

    const challengeToUpdate = MockedChallenges[0];
    const newChallengeText = 'Jysla tunge løft!';

    const challengeId = challengeToUpdate.id;
    updateState(actions.setChallengeTitle({
      challengeId, newChallengeText
    }));

    expect(getChallenges(state)[0].currentTranslation.text)
      .toBe(newChallengeText);
  });

  it('can add title of challenge when currentTranslation == null', () => {
    updateState(actions.fetchChallengesSucceeded(ChallengesNoTranslation));
    const challengeToUpdate = ChallengesNoTranslation[0];
    const newChallengeText = 'Jysla tunge løft!';

    const challengeId = challengeToUpdate.id;
    updateState(actions.setChallengeTitle({
      challengeId, newChallengeText
    }));

    expect(getChallenges(state)[0].currentTranslation.text)
      .toBe(newChallengeText);
  });

});
