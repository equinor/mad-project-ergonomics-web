import { createAction } from 'redux-actions';

// Categories belong in a category. Many to many relation
export const fetchCategories = createAction('Categories/GET');
export const fetchCategoriesRequested = createAction('Categories/GET_REQUESTED');
export const fetchCategoriesSucceeded = createAction('Categories/GET_SUCCEEDED');
export const fetchCategoriesFailed = createAction('Categories/GET_FAILED');

export const reorderCategories = createAction('Categories/Reorder');
export const reorderCategoriesState = createAction('Categories/Reorder_update_local-state');
export const reorderCategoriesSucceeded = createAction('Categories/Reorder_API_SUCCESS');
export const reorderCategoriesFailed = createAction('Categories/Reorder_FAILED');

export const selectCategory = createAction('Categories/SELECT_SUCCEEDED');
export const unselectCategory = createAction('Categories/UNSELECT');

export const createCategory = createAction('New_Category/Create');
export const createCategoryRequested = createAction('New_Category/POST_REQUESTED');
export const createCategoriesSucceeded = createAction('New_Category/POST_SUCCEEDED');
export const createCategoryFailed = createAction('New_Category/POST_FAILED');

export const deleteCategory = createAction('Category/DELETE');
export const deleteCategoryRequested = createAction('Category/DELETE_REQUESTED');
export const deleteCategoriesSucceeded = createAction('Category/DELETE_SUCCEEDED');
export const deleteCategoryFailed = createAction('Category/DELETE_FAILED');

export const setCategoryTitle = createAction('Categories_TEXT/PATCH');
export const setCategoryTitleRequested = createAction('Categories_TEXT/PATCH_REQUESTED');
export const setCategoryTitleSucceeded = createAction('Categories_TEXT/PATCH_SUCCEEDED');
export const setCategoryTitleFailed = createAction('Categories_TEXT/PATCH_FAILED');

export const setCategoryPublished = createAction('setCategoryPublished/PATCH');
export const setCategoryPublishedRequested = createAction('setCategoryPublished/PATCH_REQUESTED');
export const setCategoryPublishedSucceeded = createAction('setCategoryPublished/PATCH_SUCCEEDED');
export const setCategoryPublishedFailed = createAction('setCategoryPublished/PATCH_FAILED');

// IMAGE UPLOAD (Category)
export const uploadCategoryImage = createAction('Category_IMAGE');
export const uploadCategoryImageRequested = createAction('Category_IMAGE/POST_REQUESTED');
export const uploadCategoryImageSucceeded = createAction('Category_IMAGE/POST_SUCCEEDED');
export const uploadCategoryImageFailed = createAction('Category_IMAGE/POST_FAILED');
