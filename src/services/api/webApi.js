/**
 * This is just an example to get you started. You need to
 * set the proper config in the config/config.json file and
 * update this file as needed (or scrap it and make your own).
 */

import { authorize, login } from '../adal';
import { NetworkException } from '../../utils/Exception';
import { getResource, getDefaultResourceName } from '../../settings';

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const defaultResource = getDefaultResourceName();

function sendRequest(request, resource) {
  return authorize(resource).then(
    accessToken => request(accessToken)
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return Promise.resolve({});
          }
          return response.json();
        }
        throw new NetworkException(response.statusText, response.status);
      }),
    () => login(resource),
  );
}

function fetchJson(path, resource = defaultResource) {
  const url = `${getResource(resource).ApiBaseUrl}${path}`;
  const request = accessToken =>
    fetch(
      url,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          ...jsonHeaders,
          Authorization: `Bearer ${accessToken}`,
        },
      });

  return sendRequest(request, resource);
}

function submitData(data, path, method = 'PUT', resource = defaultResource) {
  const url = `${getResource(resource).ApiBaseUrl}${path}`;
  const request = accessToken =>
    fetch(
      url,
      {
        method,
        withCredentials: true,
        headers: {
          ...jsonHeaders,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

  return sendRequest(request, resource);
}

// example
export default {
  getPeople: () => fetchJson('/people'),
  createPerson: () => submitData({}, 'people', 'POST'),
};

