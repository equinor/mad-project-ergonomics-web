import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import { fetchChallenges } from '../challenges/actions';
import { fetchQuestions } from '../questions/actions';
import { getSelectedChallenge } from '../challenges/reducer';
import {
  fetchCombinations,
  fetchInvalidCombinations,
  fetchMissingCombinations
} from '../combinations/actions';
import { fetchMeasures } from '../measures/actions';

function* setActiveTab(action) {
  try {
    const tab = action.payload;

    yield put(fetchChallenges());

    const selectedChallenge = yield select(getSelectedChallenge);
    if (selectedChallenge.id) {
      yield put(fetchQuestions(selectedChallenge.id));
      yield put(fetchCombinations(selectedChallenge.id));

      if (tab === 'Results') {
        yield put(fetchMissingCombinations(selectedChallenge.id));
        yield put(fetchInvalidCombinations(selectedChallenge.id));
      }
    }
    if (tab === 'Results') {
      yield put(fetchMeasures(selectedChallenge.id));
    }


  } catch (ex) {
    yield call(handleError, ex);
  }
}

export default function* watchSetActiveTab() {
  yield takeLatest(actions.setActiveTab.toString(), setActiveTab);
}
