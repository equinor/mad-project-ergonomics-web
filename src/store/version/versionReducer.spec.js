import reducer from './versionReducer';
import * as actions from './versionActions';
import * as selectors from '../selectors';
import { stateKeys } from '../../types';

const defaultState = { current: null };

let state;

it('should set the correct states and return correct values from the selectors', () => {
  state = {
    [stateKeys.VERSION]: { ...defaultState },
  };
  expect(state).toEqual({
    version: {
      current: null,
    },
  });

  let action = actions.setVersion('1.0');
  state = {
    [stateKeys.VERSION]: reducer(state.version, action),
  };
  expect(selectors.getVersion(state)).toBe('1.0');

  action = actions.setVersion('1.1');
  state = {
    [stateKeys.VERSION]: reducer(state.version, action),
  };
  expect(selectors.getVersion(state)).toBe('1.1');

  action = actions.clearVersion();
  state = {
    [stateKeys.VERSION]: reducer(state.version, action),
  };
  expect(selectors.getVersion(state)).toBeNull();
});
