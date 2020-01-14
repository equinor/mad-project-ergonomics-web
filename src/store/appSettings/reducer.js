import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [actions.toggleDrawer]: state => ({
      ...state,
      drawer: { isOpen: !state.drawer.isOpen }
    }),
  },
  { drawer: { isOpen: true } }
);

export const getDrawerIsOpen = state => state[stateKeys.AppSettings].drawer.isOpen;

