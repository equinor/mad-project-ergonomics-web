import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../store/config';
import Routes from '../routes';

export default class ConnectedNavigator extends Component {
  static propTypes = {
    appHeader: PropTypes.func,
  };

  static defaultProps = {
    appHeader: null,
  };

  render() {
    const { appHeader } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div>
          { appHeader && appHeader() }
          <Routes />
        </div>
      </ConnectedRouter>
    );
  }
}
