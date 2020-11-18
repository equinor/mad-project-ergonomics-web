import { createAction } from 'redux-actions';


export const toggleChallengeDrawer = createAction('Drawer/ChallengeToggle');
export const toggleCategoryDrawer = createAction('Drawer/CategoryToggle');

export const showEditCategory = createAction('Category/ShowEdit');
export const hideEditCategory = createAction('Category/HideEdit');

export const setActiveTab = createAction('Navigate/TAB');

export const showResultsModal = createAction('ResultsTab/MODAL_SHOW');
export const hideResultsModal = createAction('ResultsTab/MODAL_HIDE');

export const showMeasuresModal = createAction('ResultsTab/MODAL_SHOW/MEASURES');
export const hideMeasuresModal = createAction('ResultsTab/MODAL_HIDE/MEASURES');
