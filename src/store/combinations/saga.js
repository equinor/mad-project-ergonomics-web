import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import api from '../../services/api';


function* fetchCombinations(action) {
  try {
    yield put(actions.fetchCombinationsRequested());
    const response = yield call(api.getCombinations, action.payload);
    yield put(actions.fetchCombinationsSuccess(response));
  } catch (e) {
    yield handleError(e);
    yield put(actions.fetchCombinationsFailed());
  }
}

function* fetchMissingCombinations(action) {
  try {
    yield put(actions.fetchCombinationsRequested());
    const response = yield call(api.getMissingCombinations, action.payload);
    yield put(actions.fetchMissingCombinationsSuccess(response));
  } catch (e) {
    yield handleError(e);
    yield put(actions.fetchMissingCombinationsFailed());
  }
}

function* fetchInvalidCombinations(action) {
  try {
    yield put(actions.fetchInvalidCombinationsRequested());
    const response = yield call(api.getInvalidCombinations, action.payload);
    yield put(actions.fetchInvalidCombinationsSuccess(response));
  } catch (e) {
    yield handleError(e);
    yield put(actions.fetchInvalidCombinationsFailed());
  }
}

function* fetchAllPossibleCombinations(action) {
  try {
    yield put(actions.fetchAllPossibleCombinationsRequested());
    const response = yield call(api.getAllPossibleCombinations, action.payload);
    yield put(actions.fetchAllPossibleCombinationsSuccess(response));
  } catch (e) {
    yield handleError(e);
    yield put(actions.fetchAllPossibleCombinationsFailed());
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

