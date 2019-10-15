import { delay } from 'redux-saga';
import {
  put,
} from 'redux-saga/effects';
import * as actions from '../authActions';
import mockConfig from '../../../mockData/mock-config';

export function* signOutFlow() {
  yield put(actions.loginReset());
}

export function* authenticateFlow() {
  yield put(actions.loginRequested());
  yield delay(100);
  yield put(actions.loginSucceeded(mockConfig.mockedUser));
}
