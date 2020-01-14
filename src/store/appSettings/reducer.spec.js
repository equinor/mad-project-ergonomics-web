import { stateKeys } from '../../types';
import reducer, { getDrawerIsOpen } from './reducer';
import { toggleDrawer } from '../appSettings/actions';


const defaultState = { drawer: { isOpen: true } };
let state = {
  [stateKeys.AppSettings]: {}
};

describe('AppSettings actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.AppSettings]: { ...defaultState } };
  });

  it('can toggle the drawer', () => {
    const action = toggleDrawer();

    expect(getDrawerIsOpen(state))
      .toBe(true);

    state = {
      [stateKeys.AppSettings]: reducer(state.AppSettings, action),
    };
    expect(getDrawerIsOpen(state))
      .toBe(false);

    state = {
      [stateKeys.AppSettings]: reducer(state.AppSettings, action),
    };

    expect(getDrawerIsOpen(state))
      .toBe(true);
  });

});
