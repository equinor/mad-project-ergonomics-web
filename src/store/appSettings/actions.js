import { createAction } from 'redux-actions';

export const toggleDrawer = createAction('Drawer/Toggle');

export const setActiveTab = createAction("Navigate/TAB");

export const showResultsModal=createAction('ResultsTab/MODAL_SHOW');
export const hideResultsModal=createAction('ResultsTab/MODAL_HIDE');
