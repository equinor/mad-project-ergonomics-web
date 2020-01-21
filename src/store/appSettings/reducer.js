import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [actions.toggleDrawer]: state => ({
      ...state,
      drawer: { isOpen: !state.drawer.isOpen }
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
  },
  { drawer: { isOpen: true }, activeTab: 'Questions', resultsModalIsShowing: false }
);

export const getDrawerIsOpen = state => state[stateKeys.AppSettings].drawer.isOpen;

export const getActiveTab = state => state[stateKeys.AppSettings].activeTab;

export const getResultsModalIsShowing = state => state[stateKeys.AppSettings].resultsModalIsShowing;

