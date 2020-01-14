import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import { getCurrentLanguage } from '../languages/reducer';
import { getQuestionAnswerAlternativesForQuestionWithId, getQuestions } from './reducer';
import { getSelectedChallenge } from '../challenges/reducer';

function* fetchQuestions(action) {
  const challengeId = action.payload;
  try {
    yield put(actions.fetchQuestionsRequested());
    const language = yield select(getCurrentLanguage);
    const response = yield call(api.getQuestionsForChallenge, challengeId, language.code);
    yield put(actions.fetchQuestionsSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.fetchQuestionsFailed());
  }
}

function* reorderQuestion(action) {
  const { oldIndex, newIndex } = action.payload;
  try {
    yield put(actions.reorderQuestionsState({ oldIndex, newIndex }));
    const questions = yield select(getQuestions);
    const selectedChallenge = yield select(getSelectedChallenge);
    const response = yield call(api.orderQuestions, selectedChallenge.id, questions);
    yield put(actions.reorderQuestionsSucceeded(response));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.reorderQuestionsState({ oldIndex: newIndex, newIndex: oldIndex })); // If it fails, then revert the change.
    yield put(actions.reorderQuestionsFailed());
  }
}

function* reorderAnswers(action) {
  const { oldIndex, newIndex, question } = action.payload;
  try {
    yield put(actions.reorderAnswersState({ oldIndex, newIndex, question }));
    const answers = yield select(getQuestionAnswerAlternativesForQuestionWithId, question.id);
    const response = yield call(api.orderAnswers, question.id, answers);
    yield put(actions.reorderAnswersSucceeded(response));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.reorderAnswersState({ oldIndex: newIndex, newIndex: oldIndex, question })); // If it fails, then revert the change.
    yield put(actions.reorderAnswersFailed());
  }
}


function* createQuestion() {
  try {
    yield put(actions.createQuestionRequested());
    const selectedChallenge = yield select(getSelectedChallenge);
    const response = yield call(api.newQuestion, selectedChallenge.id);
    yield put(actions.createQuestionSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.createQuestionFailed());
  }
}

function* fetchQuestionsForSelectedChallenge() {
  try {
    const selectedChallenge = yield select(getSelectedChallenge);
    yield put(actions.fetchQuestions(selectedChallenge.id));
  } catch (e) {
    yield call(handleError, e);
  }
}

function* removeQuestion(action) {
  const challenge = action.payload;
  try {
    yield call(api.deleteQuestion, challenge.id);
  } catch (e) {
    yield call(handleError, e);
    yield* fetchQuestionsForSelectedChallenge();
  }
}


function* addAlternative(action) {
  const questionId = action.payload;
  try {
    yield put(actions.addAlternativeRequested());
    const newAnswerAlternative = yield call(api.newAnswerAlternative, questionId);
    // We wait for the request to succeed since we need the id of the alternative before we can do anything else with it.
    yield put(actions.addAlternativeSucceeded({
      newAnswerAlternative,
      questionId
    }));
  } catch (ex) {
    yield call(handleError(ex));
    yield put(actions.addAlternativeFailed());
  }
}


function* removeAlternative(action) {
  const { answer } = action.payload;
  try {
    yield call(api.deleteAnswer, answer.id);
    yield put(actions.removeAlternativeSucceeded());
  } catch (err) {
    yield call(handleError, err);
    yield put(actions.removeAlternativeFailed());
    // if it fails => try to update the question from back-end
    yield* fetchQuestionsForSelectedChallenge();
  }
}


const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* updateQuestionText(action) {
  yield delay(360);
  try {
    const { questionId, newText: text } = action.payload;
    const language = yield select(getCurrentLanguage);
    const languageCode = language.code;
    yield put(actions.updateQuestionTextRequested());
    const response = yield call(api.updateQuestionText, {
      questionId, text, languageCode
    });
    yield put(actions.updateQuestionTextSucceeded(response));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.updateQuestionTextFailed());
    yield* fetchQuestionsForSelectedChallenge();
  }
}

function* updateAnswerText(action) {
  yield delay(360);
  try {
    const { answerId, newText: text } = action.payload;
    const language = yield select(getCurrentLanguage);
    const languageCode = language.code;
    yield put(actions.updateAnswerTextRequested());
    yield call(api.updateAnswerText, { answerId, text, languageCode });
    yield put(actions.updateAnswerTextSucceeded());
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.updateAnswerTextFailed());
    yield* fetchQuestionsForSelectedChallenge();
  }
}


function* uploadAnswerImage(action) {
  try {
    const { answerId, image } = action.payload;
    yield put(actions.uploadAnswerImageRequested());
    const response = yield call(api.uploadAnswerImage, { answerId, image });
    yield put(actions.uploadAnswerImageSucceeded(response));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.uploadAnswerImageFailed());
  }
}

export function* watchUploadAnswerImage() {
  yield takeEvery(actions.uploadAnswerImage.toString(), uploadAnswerImage);
}


export function* watchCreateQuestion() {
  yield takeLatest(actions.createQuestion.toString(), createQuestion);
}

export function* watchRemoveQuestion() {
  yield takeEvery(actions.removeQuestion.toString(), removeQuestion);
}

export function* watchAddAlternative() {
  yield takeLatest(actions.addAlternative.toString(), addAlternative);
}

export function* watchRemoveAlternative() {
  yield takeLatest(actions.removeAlternative.toString(), removeAlternative);
}

export default function* watchFetchQuestions() {
  yield takeLatest(actions.fetchQuestions.toString(), fetchQuestions);
}

export function* watchReorderQuestion() {
  yield takeLatest(actions.reorderQuestions.toString(), reorderQuestion);
}

export function* watchReorderAnswers() {
  yield takeEvery(actions.reorderAnswers.toString(), reorderAnswers);
}

export function* watchUpdateQuestionText() {
  yield takeLatest(actions.updateQuestionText.toString(), updateQuestionText);
}

export function* watchUpdateAnswerText() {
  yield takeLatest(actions.updateAnswerText.toString(), updateAnswerText);
}
