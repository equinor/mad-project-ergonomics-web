import { handleActions } from 'redux-actions';
import { cloneDeep } from 'lodash';
import arrayMove from 'array-move';
import * as actions from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [actions.fetchCategoriesRequested]: state => ({
      ...state,
      isFetching: true,
    }),
    [actions.fetchCategoriesSucceeded]: (state, action) => {
      const lastSelectedCategory = state.categories.find(category => category.isSelected);
      // If we have a selected Category... remember it
      const categories = lastSelectedCategory ? action.payload.map(category => {
        if (category.id === lastSelectedCategory.id) {
          return { ...category, isSelected: true };
        }
        return category;
      }) : action.payload;
      return ({
        ...state,
        categories,
        isFetching: false,
      });
    },
    [actions.fetchCategoriesFailed]: state => ({
      ...state,
      isFetching: false,
    }),
    [actions.setCategoryTitle]: (state, action) => {
      const { categoryId, newCategoryText } = action.payload;
      const clonedState = cloneDeep(state);

      let categoryToUpdate =
        clonedState.categories.find(category => category.id === categoryId);

      if (!categoryToUpdate) {
        categoryToUpdate = {};
      }
      categoryToUpdate.currentTranslation = {
        ...categoryToUpdate.currentTranslation,
        text: newCategoryText
      };

      return (clonedState);
    },
    [actions.setCategoryTitleSucceeded]: (state, action) => {
      const { categoryId, newCategoryText } = action.payload;
      const clonedState = cloneDeep(state);

      const categoryToUpdate =
        clonedState.categories.find(category => category.id === categoryId);

      categoryToUpdate.currentTranslation = {
        ...categoryToUpdate.currentTranslation,
        text: newCategoryText
      };

      return (clonedState);
    },
    [actions.selectCategory]: (state, action) => {
      // Find the Category and update it
      const newCategories = state.categories.map(category => ({
        ...category,
        isSelected: category.id === action.payload.id
      }));
      return ({
        ...state,
        categories: newCategories,
        isFetching: false,
      });
    },
    [actions.unselectCategory]: (state) => {
      // Unselect all categories
      const categories = state.categories.map(category => ({
        ...category,
        isSelected: false
      }));
      return ({
        ...state,
        categories,
        isFetching: false,
      });
    },
    [actions.reorderCategoriesState]: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const categories = arrayMove(state.categories, oldIndex, newIndex);

      return ({
        ...state,
        categories
      });
    },
  },
  { categories: [], isFetching: false }
);

export const getCategories = state => state[stateKeys.CATEGORIES].categories;

export const getIsFetchingCategories = state => state[stateKeys.CATEGORIES].isFetching;

export const getSelectedCategory = state => state[stateKeys.CATEGORIES].categories
  .find(category => category.isSelected);

export const getSomeCategoryIsSelected = state => state[stateKeys.CATEGORIES].categories.some(category => category.isSelected);
