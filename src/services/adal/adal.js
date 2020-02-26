import AuthenticationContext from 'adal-angular';
import config, { getResource } from '../../settings';

const authContext = new AuthenticationContext({
  tenant: config.AzureADTenantId,
  clientId: config.AzureADClientId,
  disableRenewal: true,
  // expireOffsetSeconds: 59 * 60,
  extraQueryParameter: 'nux=1',
  redirectUri: `${config.AppBaseUrl}/auth.html`,
});

export function login(resource) {
  authContext.loginResource = resource || null;
  authContext.login();
}

export function logout() {
  authContext.logOut();
}

function acquireToken(resource) {
  return new Promise((resolve, reject) => {
    authContext.acquireToken(resource, (error, tokenOut) => {
      if (error || !tokenOut) {
        const reason = error !== undefined ? error : Error('Unable to acquire a token');
        reject(reason);
      } else {
        resolve(tokenOut);
      }
    });
  });
}

export const getSignedInUser = () => authContext.getCachedUser();

export function authorize(resourceId) {
  const resource = getResource(resourceId);
  if (!resource) {
    return Promise.reject(`No resource configured for '${resourceId}'`);
  }
  return acquireToken(resource.AzureADResourceId);
}

export function handleCallback(hash) {
  authContext.handleWindowCallback(hash);
}
