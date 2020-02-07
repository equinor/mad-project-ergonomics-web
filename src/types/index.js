export const authStatusTypes = {
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
  AUTHENTICATING: 'NOT_AUTHENTICATED',
  AUTHENTICATED: 'AUTHENTICATED',
  FAILED: 'FAILED',
  SIGNED_OUT: 'SIGNED_OUT',
};

export const userRoles = {
  UNKNOWN: 'unknown',
  USER: 'user',
  MANAGER: 'manager',
  ADMIN: 'admin',
};

export const requestTypes = {
  NONE: 'NONE',
  REQUESTED: 'REQUESTED',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

export const stateKeys = {
  AUTH: 'auth',
  CONNECTIVITY: 'connectivity',
  VERSION: 'version',
  MANIFEST: 'schemaVersion',
  CHANGELOG: 'releaseNote',
  NAV: 'routes',
  PEOPLE: 'people',
  LANGUAGES: 'languages',
  CHALLENGES: 'challenges',
  QUESTIONS: 'questions',
  LABELS: 'labels',
  AppSettings: 'AppSettings',
  COMBINATIONS: 'Combinations',
  MEASURES: 'Measures'
};

export const toastMessages = {
  GENERAL_ERROR: 'The application encountered an error.\n\nPlease try again later',
  API_UNAVAILABLE: 'The service endpoint is unavailable\n\nPlease try again later',
  NOT_AUTHORIZED: 'You are missing rights to access this application\n\nPlease contact support',
};
