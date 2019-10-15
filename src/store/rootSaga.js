import watchAuthentication from './auth/sagas';
import watchFetchChangelog from './changelog/changelogSaga';

const root = function* rootSaga() {
  yield [
    watchFetchChangelog(),
    watchAuthentication(),
  ];
};

export default root;
