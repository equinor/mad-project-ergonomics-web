import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [actions.toggleChallengeDrawer]: state => ({
      ...state,
      challengeDrawer: { isOpen: !state.challengeDrawer.isOpen }
    }),
    [actions.toggleCategoryDrawer]: state => ({
      ...state,
      categoryDrawer: { isOpen: !state.categoryDrawer.isOpen }
    }),
    [actions.showEditCategory]: state => ({
      ...state,
      showEditCategory: true
    }),
    [actions.hideEditCategory]: state => ({
      ...state,
      showEditCategory: false
    }),
    [actions.setActiveTab]: (state, action) => ({
      ...state,
      activeTab: action.payload
    }),
    [actions.showResultsModal]: (state) => ({
      ...state,
      resultsModalIsShowing: true,
    }),
    [actions.hideResultsModal]: (state) => ({
      ...state,
      resultsModalIsShowing: false,
    }),
    [actions.showMeasuresModal]: (state) => ({
      ...state,
      measuresModalIsShowing: true,
    }),
    [actions.hideMeasuresModal]: (state) => ({
      ...state,
      measuresModalIsShowing: false,
    }),
  },
  {
    challengeDrawer: { isOpen: true },
    categoryDrawer: { isOpen: true },
    activeTab: 'Questions',
    resultsModalIsShowing: false,
    measuresModalIsShowing: false,
    showEditCategory: false,
  }
);

export const getChallengeDrawerIsOpen = state => state[stateKeys.AppSettings].challengeDrawer.isOpen;

export const getCategoryDrawerIsOpen = state => state[stateKeys.AppSettings].categoryDrawer.isOpen;

export const getShowEditCategory = state => state[stateKeys.AppSettings].showEditCategory;

export const getActiveTab = state => state[stateKeys.AppSettings].activeTab;

export const getResultsModalIsShowing = state => state[stateKeys.AppSettings].resultsModalIsShowing;

export const getMeasuresModalIsShowing = state => state[stateKeys.AppSettings].measuresModalIsShowing;
