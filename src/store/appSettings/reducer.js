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
  },
  { drawer: { isOpen: true }, activeTab: 'Questions' }
);

export const getDrawerIsOpen = state => state[stateKeys.AppSettings].drawer.isOpen;

export const getActiveTab = state => state[stateKeys.AppSettings].activeTab;
