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
export const fetchData = (path, resource = config.defaultResource, returnRaw = false) =>
  authorize(resource)
    .then(r =>
      fetch(createUrl(resource, path), {
        method: 'GET',
        withCredentials: true,
        headers: {
          ...config.jsonHeaders,
          Authorization: `Bearer ${r}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            if (returnRaw) {
              return response;
            }
            return response.json();
          }
          throw new NetworkException(response.statusText, response.status);
        }));

export const fetchDataWithLanguage = (path, language, resource = config.defaultResource) =>
  authorize(resource)
    .then(r =>
      fetch(createUrl(resource, path), {
        method: 'GET',
        withCredentials: true,
        headers: {
          ...config.jsonHeaders,
          UserLanguage: language,
          Authorization: `Bearer ${r}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new NetworkException(response.statusText, response.status);
        }));

export const submitData = (path, data, method = 'POST', resource = config.defaultResource) =>
  authorize(resource)
    .then(r =>
      fetch(createUrl(resource, path), {
        method,
        body: JSON.stringify(data),
        withCredentials: true,
        headers: {
          ...config.jsonHeaders,
          Authorization: `Bearer ${r}`,
          UserLanguage: 'NO'
        },
      })
        .then((response) => {
          if (response.status === 204) {
            return response;
          }
          if (response.ok) {
            return response.json();
          }
          throw new NetworkException(response.statusText, response.status);
        }));

export const postImage = (path, data, method = 'POST', resource = config.defaultResource) => {
  const formData = new FormData();
  formData.append('image', data);

  // request Add Graphic to ParentEntity
  return (
    authorize(resource)
      .then(r =>
        fetch(createUrl(resource, path), {
          method,
          body: formData,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${r}`,
          }
        })
          .then((response) => {
            if (response.status === 204) {
              return response;
            }
            if (response.ok) {
              return response.json();
            }
            throw new NetworkException(response.statusText, response.status);
          }))
  );
};

export const submitDataWithLanguage = (path, data, language, method = 'POST', resource = config.defaultResource) => {
  return authorize(resource)
    .then(r =>
      fetch(createUrl(resource, path), {
        method,
        body: JSON.stringify(data),
        withCredentials: true,
        headers: {
          ...config.jsonHeaders,
          UserLanguage: language,
          Authorization: `Bearer ${r}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new NetworkException(response.statusText, response.status);
        }));
};
