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

export function isAuthenticated() {
  const user = authContext.getCachedUser();
  if (!user) return Promise.reject('No user');
  const idToken = authContext.getCachedToken(authContext.config.loginResource);
  if (!idToken) return Promise.reject('No id token');
  return Promise.resolve(idToken);
}

export function authorize(resourceId) {
  const resource = getResource(resourceId);
  if (!resource) {
    return Promise.reject(`No resource configured for '${resourceId}'`);
  }
  return isAuthenticated()
    .then(
      () => {
        return acquireToken(resource.AzureADResourceId);
      },
      (ex) => {
        return Promise.reject(ex);
      },
    );
}

export function handleCallback(hash) {
  authContext.handleWindowCallback(hash);
}
