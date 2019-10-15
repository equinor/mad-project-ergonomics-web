import { handleActions } from 'redux-actions';

import {
  fetchChangelogRequested,
  fetchChangelogSucceeded,
  fetchChangelogFailed,
} from './changelogActions';

export default handleActions({
  [fetchChangelogRequested]: state => ({
    ...state,
    content: {},
    fetching: true,
  }),
  [fetchChangelogSucceeded]: (state, action) => ({
    ...state,
    content: { ...action.payload },
    fetching: false,
  }),
  [fetchChangelogFailed]: state => ({
    ...state,
    fetching: false,
  }),
}, { content: {}, fetching: false });

