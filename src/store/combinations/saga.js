import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import api from '../../services/api';
import { getCurrentLanguage } from '../languages';
import { getSelectedCombination } from './reducer';


function* fetchCombinations(action) {
  try {
    const challengeId = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.fetchCombinationsRequested());
    const response = yield call(api.getCombinations, { challengeId, language: language.code });
    yield put(actions.fetchCombinationsSuccess(response));
  } catch (e) {
    yield handleError(e);
    yield put(actions.fetchCombinationsFailed());
  }
}

function* fetchMissingCombinations(action) {
  try {
    const challengeId = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.fetchCombinationsRequested());
    const response = yield call(api.getMissingCombinations, {
      challengeId,
      language: language.code
    });
    yield put(actions.fetchMissingCombinationsSuccess(response));
  } catch (e) {
    yield handleError(e);
    yield put(actions.fetchMissingCombinationsFailed());
  }
}

function* fetchInvalidCombinations(action) {
  try {
    const challengeId = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.fetchInvalidCombinationsRequested());
    const response = yield call(api.getInvalidCombinations, {
      challengeId,
      language: language.code
    });
    yield put(actions.fetchInvalidCombinationsSuccess(response));
  } catch (e) {
    yield handleError(e);
    yield put(actions.fetchInvalidCombinationsFailed());
  }
}

function* fetchAllPossibleCombinations(action) {
  try {
    const challengeId = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.fetchAllPossibleCombinationsRequested());
    const response = yield call(api.getAllPossibleCombinations, {
      challengeId,
      language: language.code
    });
    yield put(actions.fetchAllPossibleCombinationsSuccess(response));
  } catch (e) {
    yield handleError(e);
    yield put(actions.fetchAllPossibleCombinationsFailed());
  }
}


function* creatOrUpdateCombination(action) {
  try {
    const combination = action.payload;
    console.log('creatOrUpdateCombination Combination', combination);
    yield put(actions.creatOrUpdateCombinationRequested());
    yield put(actions.creatOrUpdateCombinationSuccess());

  } catch (e) {
    yield handleError(e);
    yield put(actions.creatOrUpdateCombinationFailed());
  }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* setSelectedCombinationText(action) {
  yield delay(360);
  try {
    const { newCombinationText: text } = action.payload;
    const selectedCombination = yield select(getSelectedCombination);
    const language = yield select(getCurrentLanguage);
    yield put(actions.setSelectedCombinationTextRequested());
    const response = yield call(api.updateCombinationText, {
      combinationId: selectedCombination.id,
      languageCode: language.code,
      text,
    });
    yield put(actions.setSelectedCombinationTextSucceeded(response));
  } catch (err) {
    yield call(handleError, err);
    yield put(actions.setSelectedCombinationTextFailed());
    yield put(actions.fetchCombinations());
  }
}

export function* watchFetchCombinations() {
  yield takeLatest(actions.fetchCombinations.toString(), fetchCombinations);
}

export function* watchFetchMissingCombinations() {
  yield takeLatest(actions.fetchMissingCombinations.toString(), fetchMissingCombinations);
}

export function* watchFetchInvalidCombinations() {
  yield takeLatest(actions.fetchInvalidCombinations.toString(), fetchInvalidCombinations);
}

export function* watchFetchAllPossibleCombinations() {
  yield takeLatest(actions.fetchAllPossibleCombinations.toString(), fetchAllPossibleCombinations);
}

export function* watchCreatOrUpdateCombination() {
  yield takeLatest(actions.creatOrUpdateCombination.toString(), creatOrUpdateCombination);
}

export function* watchSetSelectedCombinationText() {
  yield takeLatest(actions.setSelectedCombinationText.toString(), setSelectedCombinationText);

}
