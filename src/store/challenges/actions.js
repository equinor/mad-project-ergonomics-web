import { createAction } from 'redux-actions';



export const reorderChallenges = createAction('Challenges/Reorder');
export const reorderChallengesState = createAction('Challenges/Reorder_update_local-state');
export const reorderChallengesSucceeded = createAction('Challenges/Reorder_API_SUCCESS');
export const reorderChallengesFailed = createAction('Challenges/Reorder_FAILED');

export const fetchChallenges = createAction('Challenges/GET');
export const fetchChallengesRequested = createAction('Challenges/GET_REQUESTED');
export const fetchChallengesSucceeded = createAction('Challenges/GET_SUCCEEDED');
export const fetchChallengesFailed = createAction('Challenges/GET_FAILED');

export const selectChallenge = createAction('Challenges/SELECT_SUCCEEDED');
export const unselectChallenge = createAction('Challenges/UNSELECT');

export const createChallenge = createAction('New_Challenge/Create');
export const createChallengeRequested = createAction('New_Challenge/POST_REQUESTED');
export const createChallengeSucceeded = createAction('New_Challenge/POST_SUCCEEDED');
export const createChallengeFailed = createAction('New_Challenge/POST_FAILED');

export const deleteChallenge = createAction('Challenge/DELETE');
export const deleteChallengeRequested = createAction('Challenge/DELETE_REQUESTED');
export const deleteChallengeSucceeded = createAction('Challenge/DELETE_SUCCEEDED');
export const deleteChallengeFailed = createAction('Challenge/DELETE_FAILED');

export const setChallengeTitle = createAction('Challenges_TEXT/PATCH');
export const setChallengeTitleRequested = createAction('Challenges_TEXT/PATCH_REQUESTED');
export const setChallengeTitleSucceeded = createAction('Challenges_TEXT/PATCH_SUCCEEDED');
export const setChallengeTitleFailed = createAction('Challenges_TEXT/PATCH_FAILED');

// IMAGE UPLOAD (Challenge)
export const uploadChallengeImage = createAction('CHALLENGE_IMAGE');
export const uploadChallengeImageRequested = createAction('CHALLENGE_IMAGE/POST_REQUESTED');
export const uploadChallengeImageSucceeded = createAction('CHALLENGE_IMAGE/POST_SUCCEEDED');
export const uploadChallengeImageFailed = createAction('CHALLENGE_IMAGE/POST_FAILED');
