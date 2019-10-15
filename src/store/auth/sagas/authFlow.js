import { delay } from 'redux-saga';
import {
  put,
  call,
  take,
} from 'redux-saga/effects';
import {
  login,
  logout,
  getSignedInUser,
} from '../../../services/adal';
import * as actions from '../authActions';
import { getDefaultResource } from '../../../settings';

export function* authenticateFlow(action) {
  yield put(actions.loginRequested());
  const silent = !!action.payload;
  try {
    let userInfo = yield call(getSignedInUser);
    while (!userInfo && !silent) {
      yield delay(10);
      const defaultResource = yield call(getDefaultResource);
      yield call(login, defaultResource && defaultResource.AzureADResourceId);
      yield take(`${actions.login}`);
      userInfo = yield call(getSignedInUser);
    }
    if (!userInfo && silent) {
      throw new Error('silent auth not possible');
    }

    // NEED TO UPDATE THIS FOR ACTUAL APPLICATION - DOES NOT MATCH
    // STATE FROM REDUCER
    const profile = {
      userId: userInfo.userName,
      uniqueId: userInfo.profile.upn,
      displayableId: userInfo.profile.name,
      familyName: userInfo.profile.family_name,
      givenName: userInfo.profile.given_name,
      identityProvider: userInfo.profile.iss,
      ipaddr: userInfo.profile.ipaddr,
    };

    yield put(actions.loginSucceeded({ ...profile }));
  } catch (ex) {
    yield put(actions.loginReset());
    throw ex;
  }
}

export function* signOutFlow() {
  yield call(logout);
  yield put(actions.loginReset());
}

