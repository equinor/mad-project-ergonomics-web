import { put, call, takeLatest, select } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import { getCurrentLanguage } from '../languages/reducer';

function* getLabels() {
  try {
    yield put(actions.fetchLabelsRequested());
    const language = yield select(getCurrentLanguage);
    const response = yield call(api.getLabels, language);
    yield put(actions.fetchLabelsSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.fetchLabelsFailed());
  }
}

export default function* watchGetLabels() {
  yield takeLatest(actions.fetchLabels.toString(), getLabels);
}
