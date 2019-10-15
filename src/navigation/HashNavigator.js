import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter } from 'react-router-dom';
import Routes from '../routes';

export default class HashNavigator extends Component {
  static propTypes = {
    appHeader: PropTypes.func,
  };

  static defaultProps = {
    appHeader: null,
  };

  render() {
    const { appHeader } = this.props;
    return (
      <HashRouter>
        <div>
          { appHeader && appHeader() }
          <Routes />
        </div>
      </HashRouter>
    );
  }
}
