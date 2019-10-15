import { handleActions } from 'redux-actions';
import {
  setVersion,
  clearVersion,
} from './versionActions';


export default handleActions({
  [setVersion]: (state, action) => ({
    current: action.payload,
  }),
  [clearVersion]: () => ({
    current: null,
  }),
}, { current: null });
