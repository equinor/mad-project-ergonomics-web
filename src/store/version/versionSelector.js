import { stateKeys } from '../../types';

export const getVersion = state => state[stateKeys.VERSION].current;
