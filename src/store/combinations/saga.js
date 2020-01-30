import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import api from '../../services/api';
import { getCurrentLanguage } from '../languages';
import { getSelectedCombination } from './reducer';
import { getSelectedChallenge } from '../challenges/reducer';
import { showResultsModal } from '../appSettings/actions';
import { selectAnswers } from '../questions/actions';


function* fetchCombinations(action) {
  try {
    const challengeId = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.fetchCombinationsRequested());
    const response = yield call(api.getCombinations, { challengeId, language: language.code });
    yield put(actions.fetchCombinationsSuccess(response));
  } catch (e) {
    yield call(handleError, e);
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
    yield call(handleError, e);
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
    yield call(handleError, e);
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
    yield call(handleError, e);
    yield put(actions.fetchAllPossibleCombinationsFailed());
  }
}


function* creatOrUpdateCombination(action) {
  try {
    const combination = action.payload;
    console.log(combination);
    yield put(actions.creatOrUpdateCombinationRequested());
    const language = yield select(getCurrentLanguage);
    const selectedChallenge = yield select(getSelectedChallenge);
    const response = yield call(api.createOrUpdateCombination, {
      challengeId: selectedChallenge.id,
      combination,
      language: language.code
    });
    yield put(actions.creatOrUpdateCombinationSuccess(response));

    yield put(actions.fetchMissingCombinations(selectedChallenge.id));
    yield put(actions.fetchCombinations(selectedChallenge.id));
    yield put(actions.selectCombination(response));

  } catch (e) {
    yield call(handleError, e);
    yield put(actions.creatOrUpdateCombinationFailed());
  }
}

/**
 * Select combination extra tasks. Makes sure that the answers for the combination is also selected. And shows the modal
 * @param action
 * @return {Generator<*, void, ?>}
 */
function* selectCombination(action) {
  try {
    const response = action.payload;
    const answerIdArray = response.answers.map(answer => answer.id);
    yield put(selectAnswers({ answerIdArray }));
    yield put(showResultsModal());
  } catch (e) {
    yield call(handleError, e);
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

function* addMeasureToCombination(action) {

  try {
    const { combinationId, measureId } = action.payload;
    yield put(actions.addMeasureToCombinationRequested());
    const response = yield call(api.addMeasureToCombination, {
      combinationId,
      measureId
    });
    console.log('addMeasureToCombination', { response });
    yield put(actions.addMeasureToCombinationSucceeded(response));
    //  Fetch combination and select it.
    // TODO: What do we need to refresh???
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.addMeasureToCombinationFailed());
  }
}

function* removeMeasureFromCombination(action) {
  try {
    const { combinationId, measureId } = action.payload;
    yield put(actions.removeMeasureFromCombinationRequested());
    const response = yield call(api.removeMeasureFromCombination, {
      combinationId,
      measureId
    });
    yield put(actions.removeMeasureFromCombinationSucceeded(response));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.removeMeasureFromCombinationFailed());
  }
}


function* uploadCombinationImage(action) {
  try {
    const { combinationId, image } = action.payload;
    yield put(actions.uploadCombinationImageRequested());
    const response = yield call(api.uploadCombinationImage, { combinationId, image });
    yield put(actions.uploadCombinationImageSucceeded(response));
    // TODO: FETCH SOMETHING?
    const selectedChallenge = yield select(getSelectedChallenge);
    yield put(actions.fetchCombinations(selectedChallenge.id));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.uploadCombinationImageFailed());
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

export function* watchAddMeasureToCombination() {
  yield takeLatest(actions.addMeasureToCombination.toString(), addMeasureToCombination);
}

export function* watchRemoveMeasureFromCombination() {
  yield takeLatest(actions.removeMeasureFromCombination.toString(), removeMeasureFromCombination);
}

export function* watchUploadCombinationImage() {
  yield takeEvery(actions.uploadCombinationImage.toString(), uploadCombinationImage);
}

export function* watchSelectCombination() {
  yield takeEvery(actions.selectCombination.toString(), selectCombination);
}
