import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import { fetchChallenges } from '../challenges/actions';
import { fetchLabels } from '../labels/actions';
import { getSelectedChallenge } from '../challenges/reducer';
import { fetchQuestions } from '../questions/actions';

function* getLanguages() {
  try {
    yield put(actions.fetchLanguagesRequested());
    const response = yield call(api.getLanguages);
    yield put(actions.fetchLanguagesSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.fetchLanguagesFailed());
  }
}

function* setCurrentLanguage(action) {
  try {
    yield put(actions.setLanguageSucceeded(action.payload));
    //  Update stuff that has it's own language and needs to be refreshed

    yield put(fetchLabels());
    yield put(fetchChallenges());
    const selectedChallenge = yield select(getSelectedChallenge);
    if (selectedChallenge && selectedChallenge.id) {
      yield put(fetchQuestions(selectedChallenge.id));
    }
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.setLanguageFailed());
  }
}

export default function* watchGetLanguages() {
  yield takeLatest(actions.fetchLanguages.toString(), getLanguages);
}

export function* watchSetCurrentLanguage() {
  yield takeLatest(actions.setLanguage.toString(), setCurrentLanguage);
}
