import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppNavigator } from '../navigation';
import AppHeader from '../components/common/AppHeader';
import { authStatusTypes } from '../types';
import { getAppVersion } from '../settings';
import ErrorBoundary from '../components/common/ErrorBoundary';
import * as actions from '../store';
import * as selectors from '../store/selectors';

class App extends React.Component {
  static propTypes = {
    version: PropTypes.string,
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    authStatus: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    setVersion: PropTypes.func.isRequired,
  };

  static defaultProps = {
    version: null,
  };

  componentDidMount() {
    const appVersion = getAppVersion();
    if (this.props.version !== appVersion) {
      this.props.setVersion(appVersion);
    }
    if (this.props.authStatus === authStatusTypes.NOT_AUTHENTICATED) {
      this.props.signIn();
    }
  }

  render() {
    const {
      currentUser,
      authStatus,
      signOut,
    } = this.props;
    if (authStatus !== authStatusTypes.AUTHENTICATED) {
      return null;
    }
    return (
      <ErrorBoundary>
        <AppNavigator
          appHeader={() => (
            <AppHeader userInfo={currentUser} signOut={signOut} />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  auth: selectors.getAuth(state),
  authStatus: selectors.getAuthStatus(state),
  currentUser: selectors.getCurrentUser(state) || {},
  version: selectors.getVersion(state),
});

const mapDispatchToProps = dispatch => ({
  signIn: silent => dispatch(actions.login(silent)),
  signOut: () => dispatch(actions.loginSignOut()),
  setVersion: version => dispatch(actions.setVersion(version)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
