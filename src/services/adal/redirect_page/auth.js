/*
  This page is for handling redirects from the OAuth service.

  If the redirect is received within an iframe (background token
  renewal), then the token is processed and saved to session storage.

  Otherwise, it will be a redirect from the main window as a result
  of the user logging in. The callback will then store the id token
  and redirect to the originally requested url.
*/

import { handleCallback } from '../adal';

handleCallback();
