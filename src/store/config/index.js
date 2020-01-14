import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { manifest } from '../manifest';
import rootReducer from '../rootReducer';
import sagas from '../rootSaga';
import { stateKeys } from '../../types';

export const history = createHistory();

const reactRouterMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [];
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  middlewares.push(reduxImmutableStateInvariant());
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers; // eslint-disable-line no-underscore-dangle, max-len
}

const persistConfig = {
  key: 'root',
  whitelist: [
    stateKeys.MANIFEST,
    stateKeys.VERSION,
    stateKeys.LANGUAGES,
    // stateKeys.CHALLENGES,
    // stateKeys.QUESTIONS
    stateKeys.AppSettings
  ],
  storage,
  migrate: createMigrate(manifest),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

middlewares.push(sagaMiddleware, reactRouterMiddleware);
const store = createStore(persistedReducer, {}, composeEnhancers(
  applyMiddleware(...middlewares),
));

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../rootReducer', () => {
    const nextReducer = require('../rootReducer').default; // eslint-disable-line global-require
    store.replaceReducer(persistReducer(persistConfig, nextReducer));
  });
}

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

export default store;

