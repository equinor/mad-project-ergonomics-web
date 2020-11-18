import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import { getCurrentLanguage } from '../languages';
import { getChallenges } from './reducer';
import { getActiveTab } from '../appSettings/reducer';
import {
  fetchCombinations,
  fetchInvalidCombinations,
  fetchMissingCombinations
} from '../combinations/actions';
import { fetchQuestions } from '../questions/actions';
import * as categoryReducer from '../categories/reducer';

function* fetchChallenges() {
  try {
    yield put(actions.fetchChallengesRequested());
    const language = yield select(getCurrentLanguage);
    const category = yield select(categoryReducer.getSelectedCategory);
    let response = [];

    if (category && category.id) {
      const r = yield call(api.getChallengesInCategory, {
        language: language.code,
        categoryId: category.id
      });
      if (r && r.challenges) response = r.challenges;
    }
    // else {
    // Todo: Use this to show all challenges. No matter if they are assigned a category or not
    //   response = yield call(api.getChallenges, language.code);
    // }
    yield put(actions.fetchChallengesSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.fetchChallengesFailed());
  }
}

function* createChallenge() {
  try {
    yield put(actions.createChallengeRequested());
    const category = yield select(categoryReducer.getSelectedCategory);
    const response = yield call(api.newChallenge);
    const challengeId = response.id;
    if (category && category.id) {
      const categoryId = category.id;
      yield call(api.addChallengeToCategory, {
        categoryId,
        payload: {
          challengeId
        }
      });
    }

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

function* setChallengePublished(action) {
  yield delay(360);
  try {
    const { challengeId, published } = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.setChallengePublishedRequested());
    const response = yield call(api.updateChallengePublished, {
      challengeId,
      published,
      languageCode: language.code,
    });
    yield put(actions.setChallengePublishedSucceeded(response));
    yield put(actions.fetchChallenges());
  } catch (err) {
    yield call(handleError, err);
    yield put(actions.setChallengePublishedFailed());
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

function* selectChallenge(action) {
  try {
    const selectedChallenge = action.payload;

    const tab = yield select(getActiveTab);

    yield put(fetchCombinations(selectedChallenge.id));
    yield put(fetchQuestions(selectedChallenge.id));
    if (tab === 'Results') {
      yield put(fetchMissingCombinations(selectedChallenge.id));
      yield put(fetchInvalidCombinations(selectedChallenge.id));
    }

  } catch (ex) {
    yield call(handleError, ex);
  }
}

export default function* watchFetchChallenges() {
  yield takeLatest(actions.fetchChallenges.toString(), fetchChallenges);
}

export function* watchCreateChallenge() {
  yield takeLatest(actions.createChallenge.toString(), createChallenge);
}

export function* watchSetChallengePublished() {
  yield takeLatest(actions.setChallengePublished.toString(), setChallengePublished);
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

export function* watchSelectChallenge() {
  yield takeLatest(actions.selectChallenge.toString(), selectChallenge);
}
