import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';
import handleError from '../../utils/handleNetworkErrors';
import { getCurrentLanguage } from '../languages';
import { getCategories } from './reducer';
import { fetchChallenges } from '../challenges/actions';

function* fetchCategories() {
  try {
    yield put(actions.fetchCategoriesRequested());
    const language = yield select(getCurrentLanguage);
    const response = yield call(api.getCategories, language.code);
    yield put(actions.fetchCategoriesSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.fetchCategoriesFailed());
  }
}

function* createCategory() {
  try {
    yield put(actions.createCategoryRequested());
    const response = yield call(api.newCategory);
    yield put(actions.createCategoriesSucceeded(response));

    yield put(actions.fetchCategories());

  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.createCategoryFailed());
  }
}

function* deleteCategory(action) {
  const { categoryId, callback } = action.payload;
  try {
    yield put(actions.deleteCategoryRequested());
    yield call(api.deleteCategory, categoryId);
    yield put(actions.deleteCategoriesSucceeded());
    yield put(actions.fetchCategories());
    yield put(actions.unselectCategory());
    if (callback) callback();
  } catch (err) {
    yield call(handleError, err);
    yield put(actions.deleteCategoryFailed());
  }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* setCategoryTitle(action) {
  yield delay(360);
  try {
    const { categoryId, newCategoryText: text } = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.setCategoryTitleRequested());
    const response = yield call(api.updateCategoryText, {
      categoryId,
      languageCode: language.code,
      text,
    });
    yield put(actions.setCategoryTitleSucceeded(response));
  } catch (err) {
    yield call(handleError, err);
    yield put(actions.setCategoryTitleFailed());
    yield put(actions.fetchCategories());
  }
}

function* setCategoryPublished(action) {
  yield delay(360);
  try {
    const { categoryId, published } = action.payload;
    const language = yield select(getCurrentLanguage);
    yield put(actions.setCategoryPublishedRequested());
    const response = yield call(api.updateCategoryPublished, {
      categoryId,
      published,
      languageCode: language.code,
    });
    yield put(actions.setCategoryPublishedSucceeded(response));
    yield put(actions.fetchCategories());
  } catch (err) {
    yield call(handleError, err);
    yield put(actions.setCategoryPublishedFailed());
  }
}

function* uploadCategoryImage(action) {
  try {
    const { categoryId, image } = action.payload;
    yield put(actions.uploadCategoryImageRequested());
    const response = yield call(api.uploadCategoryImage, { categoryId, image });
    yield put(actions.uploadCategoryImageSucceeded(response));
    yield put(actions.fetchCategories());
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.uploadCategoryImageFailed());
  }
}

function* reorderCategory(action) {
  const { oldIndex, newIndex } = action.payload;
  try {
    yield put(actions.reorderCategoriesState({ oldIndex, newIndex }));
    const Categories = yield select(getCategories);
    const response = yield call(api.orderCategories, Categories);
    yield put(actions.reorderCategoriesSucceeded(response));
  } catch (e) {
    yield call(handleError, e);
    yield put(actions.reorderCategoriesState({ oldIndex: newIndex, newIndex: oldIndex })); // If it fails, then revert the change
    yield put(actions.reorderCategoriesFailed());
  }
}

function* selectCategory() {
  try {
    yield put(fetchChallenges());
  } catch (ex) {
    yield call(handleError, ex);
  }
}

export default function* watchFetchCategories() {
  yield takeLatest(actions.fetchCategories.toString(), fetchCategories);
}

export function* watchCreateCategory() {
  yield takeLatest(actions.createCategory.toString(), createCategory);
}

export function* watchSetCategoryPublished() {
  yield takeLatest(actions.setCategoryPublished.toString(), setCategoryPublished);
}

export function* watchDeleteCategory() {
  yield takeEvery(actions.deleteCategory.toString(), deleteCategory);
}

export function* watchSetCategoryTitle() {
  yield takeLatest(actions.setCategoryTitle.toString(), setCategoryTitle);
}

export function* watchUploadCategoryImage() {
  yield takeEvery(actions.uploadCategoryImage.toString(), uploadCategoryImage);
}

export function* watchReorderCategory() {
  yield takeLatest(actions.reorderCategories.toString(), reorderCategory);
}

export function* watchSelectCategory() {
  yield takeLatest(actions.selectCategory.toString(), selectCategory);

}
