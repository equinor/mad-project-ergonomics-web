import { handleActions } from 'redux-actions';
import { cloneDeep } from 'lodash';
import arrayMove from 'array-move';
import * as actions from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [actions.fetchChallengesRequested]: state => ({
      ...state,
      isFetching: true,
    }),
    [actions.fetchChallengesSucceeded]: (state, action) => {
      const lastSelectedChallenge = state.challenges.find(challenge => challenge.isSelected);
      // If we have a selected challenge... remember it
      const challenges = lastSelectedChallenge ? action.payload.map(challenge => {
        if (challenge.id === lastSelectedChallenge.id) {
          return { ...challenge, isSelected: true };
        }
        return challenge;
      }) : action.payload;
      return ({
        ...state,
        challenges,
        isFetching: false,
      });
    },
    [actions.fetchChallengesFailed]: state => ({
      ...state,
      isFetching: false,
    }),
    [actions.setChallengeTitle]: (state, action) => {
      const { challengeId, newChallengeText } = action.payload;
      const clonedState = cloneDeep(state);

      const challengeToUpdate =
        clonedState.challenges.find(challenge => challenge.id === challengeId);

      challengeToUpdate.currentTranslation = {
        ...challengeToUpdate.currentTranslation,
        text: newChallengeText
      };

      return (clonedState);
    },
    [actions.setChallengeTitleSucceeded]: (state, action) => {
      const { challengeId, newChallengeText } = action.payload;
      const clonedState = cloneDeep(state);

      const challengeToUpdate =
        clonedState.challenges.find(challenge => challenge.id === challengeId);

      challengeToUpdate.currentTranslation = {
        ...challengeToUpdate.currentTranslation,
        text: newChallengeText
      };

      return (clonedState);
    },
    [actions.selectChallenge]: (state, action) => {
      // Find the challenge and update it
      const newChallenges = state.challenges.map(challenge => ({
        ...challenge,
        isSelected: challenge.id === action.payload.id
      }));
      return ({
        ...state,
        challenges: newChallenges,
        isFetching: false,
      });
    },
    [actions.unselectChallenge]: (state) => {
      // Unselect all challenges
      const newChallenges = state.challenges.map(challenge => ({
        ...challenge,
        isSelected: false
      }));
      return ({
        ...state,
        challenges: newChallenges,
        isFetching: false,
      });
    },
    [actions.reorderChallengesState]: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const challenges = arrayMove(state.challenges, oldIndex, newIndex);

      return ({
        ...state,
        challenges
      });
    },
  },
  { challenges: [], isFetching: false }
);

export const getChallenges = state => state[stateKeys.CHALLENGES].challenges;

export const getIsFetchingChallenges = state => state[stateKeys.CHALLENGES].isFetching;

export const getSelectedChallenge = state => state[stateKeys.CHALLENGES].challenges
  .find(challenge => challenge.isSelected);

export const getSomeChallengeIsSelected = state => state[stateKeys.CHALLENGES].challenges.some(challenge => challenge.isSelected);
