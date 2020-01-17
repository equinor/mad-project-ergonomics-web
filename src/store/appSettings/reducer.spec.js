import { stateKeys } from '../../types';
import reducer, { getActiveTab, getDrawerIsOpen } from './reducer';
import { toggleDrawer , setActiveTab } from '../appSettings/actions';



const defaultState = { drawer: { isOpen: true }, activeTab: 'Questions' };
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

  it('can navigate between Questions and Results', () => {
    const QuestionsTab = 'Questions';
    const ResultsTab = 'Results';

    // check default tab
    expect(getActiveTab(state))
      .toEqual(QuestionsTab);

    // Change to Results-tab
    let action = setActiveTab(ResultsTab);
    state = {
      [stateKeys.AppSettings]: reducer(state.AppSettings, action),
    };

    expect(getActiveTab(state))
      .toEqual(ResultsTab);

    // Do it again
    state = {
      [stateKeys.AppSettings]: reducer(state.AppSettings, action),
    };
    expect(getActiveTab(state))
      .toEqual(ResultsTab);

    // Change to Questions-tab
    action = setActiveTab(QuestionsTab);
    state = {
      [stateKeys.AppSettings]: reducer(state.AppSettings, action),
    };
    expect(getActiveTab(state))
      .toEqual(QuestionsTab);

  });

});
