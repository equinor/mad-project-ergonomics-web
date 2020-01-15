import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import { getCurrentLanguage } from '../languages/reducer';
import { getChallenges } from '../challenges/reducer';

function* fetchChallenges() {
  try {
    yield put(actions.fetchChallengesRequested());
    const language = yield select(getCurrentLanguage);
    const response = yield call(api.getChallenges, language.code);
    yield put(actions.fetchChallengesSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.fetchChallengesFailed());
  }
}

function* createChallenge() {
  try {
    yield put(actions.createChallengeRequested());
    const response = yield call(api.newChallenge);
    yield put(actions.createChallengeSucceeded(response));

    yield put(actions.fetchChallenges());

  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.createChallengeFailed());
  }
}

function* deleteChallenge(action) {
  const challengeId = action.payload;
  try {
    yield put(actions.deleteChallengeRequested());
    yield call(api.deleteChallenge, challengeId);
    yield put(actions.deleteChallengeSucceeded());
    yield put(actions.fetchChallenges());
    yield put(actions.unselectChallenge());
  } catch (err) {
    yield call(handleError, err);
    yield put(actions.deleteChallengeFailed());
  }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* setChallengeTitle(action) {
  yield delay(360);
  try {
    const { challengeId, newChallengeText: text } = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.setChallengeTitleRequested());
    const response = yield call(api.updateChallengeText, {
      challengeId,
      languageCode: language.code,
      text,
    });
    yield put(actions.setChallengeTitleSucceeded(response));
  } catch (err) {
    yield call(handleError, err);
    yield put(actions.setChallengeTitleFailed());
    yield put(actions.fetchChallenges());
  }
}

function* uploadChallengeImage(action) {
  try {
    const { challengeId, image } = action.payload;
    yield put(actions.uploadChallengeImageRequested());
    const response = yield call(api.uploadChallengeImage, { challengeId, image });
    yield put(actions.uploadChallengeImageSucceeded(response));
    yield put(actions.fetchChallenges());
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.uploadChallengeImageFailed());
  }
}

function* reorderChallenge(action) {
  const { oldIndex, newIndex } = action.payload;
  try {
    yield put(actions.reorderChallengesState({ oldIndex, newIndex }));
    const challenges = yield select(getChallenges);
    const response = yield call(api.orderChallenges, challenges);
    yield put(actions.reorderChallengesSucceeded(response));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.reorderChallengesState({ oldIndex: newIndex, newIndex: oldIndex })); // If it fails, then revert the change
    yield put(actions.reorderChallengesFailed());
  }
}

export default function* watchFetchChallenges() {
  yield takeLatest(actions.fetchChallenges.toString(), fetchChallenges);
}

export function* watchCreateChallenge() {
  yield takeLatest(actions.createChallenge.toString(), createChallenge);
}

export function* watchDeleteChallenge() {
  yield takeEvery(actions.deleteChallenge.toString(), deleteChallenge);
}

export function* watchSetChallengeTitle() {
  yield takeLatest(actions.setChallengeTitle.toString(), setChallengeTitle);
}

export function* watchUploadChallengeImage() {
  yield takeEvery(actions.uploadChallengeImage.toString(), uploadChallengeImage);
}

export function* watchReorderChallenge() {
  yield takeLatest(actions.reorderChallenges.toString(), reorderChallenge);
}
