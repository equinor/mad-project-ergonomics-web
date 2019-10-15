// import { schema, normalize } from 'normalizr';
import { config, fetchData } from './api-helpers';

config.defaultResource = 'mad';

export function getReleaseNote(version) {
  return fetchData(`/ReleaseNote/TEMPLATE/${version}`, 'common');
}
