import 'bootstrap';
import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Loader from 'react-loaders';
import App from './containers/App';
import store, { persistor } from './store/config';
import './theme/styles.scss';
import './favicon.ico'; // Tell webpack to load favicon.ico

const wireUp = Application => (
  <AppContainer>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader active type={'ball-pulse'}/>}>
        <Application/>
      </PersistGate>
    </Provider>
  </AppContainer>
);

render(
  wireUp(App),
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default;
    render(
      wireUp(NewApp),
      document.getElementById('app'),
    );
  });
}

