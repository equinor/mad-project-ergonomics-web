import { stateKeys } from '../../types';

export const selectChangeLog = state => (
  state[stateKeys.CHANGELOG].content
);

export const isFetching = state => (
  state[stateKeys.CHANGELOG].fetching
);

