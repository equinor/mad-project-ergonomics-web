import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
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

function* deleteMeasure(action) {
  try {
    const {measureId,callback} = action.payload;

    yield put(actions.deleteMeasureRequested());
    const response = yield call(api.deleteMeasure, measureId);
    yield put(actions.deleteMeasureSucceeded(response));

    if (callback) yield callback()
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.deleteMeasureFailed());
  }
}

function* createMeasure(action) {
  try {
    const {callback} = action.payload;

    yield put(actions.createMeasureRequested());
    const response = yield call(api.newMeasure);
    yield put(actions.createMeasureSucceeded(response));

    if (callback) yield callback(response);
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.createMeasureFailed());
  }
}

function* uploadMeasureImage(action) {
  try {
    const { measureId, image } = action.payload;
    yield put(actions.uploadMeasureImageRequested());
    const response = yield call(api.uploadMeasureImage, { measureId, image });
    yield put(actions.uploadMeasureImageSucceeded(response));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.uploadMeasureImageFailed());
  }
}

function* updateMeasureText(action) {
  try {
    const { measureId, newText: text } = action.payload;
    const language = yield select(getCurrentLanguage);
    const languageCode = language.code;
    yield put(actions.updateMeasureTextRequested());
    const response = yield call(api.updateMeasureText, {
      measureId, text, languageCode
    });
    yield put(actions.updateMeasureTextSucceeded(response));
  } catch (e) {
    yield call(handleError, { message: 'Failed to update text' });
    yield put(actions.updateMeasureTextFailed());
    // yield put(actions.fetchMeasures());
  }
}

export default function* watchGetMeasures() {
  yield takeLatest(actions.fetchMeasures.toString(), getMeasures);
}

export function* watchDeleteMeasure() {
  yield takeLatest(actions.deleteMeasure.toString(), deleteMeasure);
}

export function* watchCreateMeasure() {
  yield takeLatest(actions.createMeasure.toString(), createMeasure);
}

export function* watchUploadMeasureImage() {
  yield takeEvery(actions.uploadMeasureImage.toString(), uploadMeasureImage);
}

export function* watchUpdateMeasureText() {
  yield takeEvery(actions.updateMeasureText.toString(), updateMeasureText);
}
