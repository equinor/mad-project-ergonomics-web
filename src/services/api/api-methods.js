import { fetchData } from './api-helpers';

export function getReleaseNote(version) {
  return fetchData(`/ReleaseNote/TEMPLATE/${version}`, 'common');
}
