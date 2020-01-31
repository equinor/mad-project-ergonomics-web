import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import { getCurrentLanguage } from '../languages/reducer';

function* getMeasures() {
  try {
    yield put(actions.fetchMeasuresRequested());
    const language = yield select(getCurrentLanguage);
    const response = yield call(api.getMeasures, { language: language.code });
    yield put(actions.fetchMeasuresSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.fetchMeasuresFailed());
  }
}

export default function* watchGetMeasures() {
  yield takeLatest(actions.fetchMeasures.toString(), getMeasures);
}
