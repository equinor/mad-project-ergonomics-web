import { authorize } from '../adal';
import { getResource } from '../../settings';
import { NetworkException } from '../../utils/Exception';

export const config = {
  defaultResource: 'Ergonomics',
  jsonHeaders: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const createUrl = (resource, path) => `${getResource(resource).ApiBaseUrl}${path}`;


// Helper functions
export const fetchData = (path, resource = config.defaultResource) => (
  authorize(resource)
    .then(r =>
      fetch(createUrl(resource, path), {
        method: 'GET',
        withCredentials: true,
        headers: {
          ...config.jsonHeaders,
          Authorization: `Bearer ${r.accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new NetworkException(response.statusText, response.status);
        }))
);

export const submitData = (path, data, method = 'POST', resource = config.defaultResource) => (
  authorize(resource)
    .then(r =>
      fetch(createUrl(resource, path), {
        method,
        body: JSON.stringify(data),
        withCredentials: true,
        headers: {
          ...config.jsonHeaders,
          Authorization: `Bearer ${r.accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new NetworkException(response.statusText, response.status);
        }))
);
