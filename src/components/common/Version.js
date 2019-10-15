import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from '../../store/selectors';

class Version extends Component {
  static propTypes = {
    version: PropTypes.string.isRequired,
  };

  render() {
    return <span>Application Version: {this.props.version}</span>;
  }
}

const mapStateToProps = state => ({
  state,
  version: selectors.getVersion(state),
});

export default connect(mapStateToProps)(Version);
