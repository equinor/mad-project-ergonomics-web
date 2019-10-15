import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Unauthorized from '../common/Unauthorized';
import * as selectors from '../../store/selectors';

// This is a Higher Order Component (HOC) used for
// role based page/route authorization (not to be confused with Authentication)

export default (ChildComponent, allowedRoles = []) => {
  class ComposedComponent extends Component {
    static propTypes = {
      auth: PropTypes.object.isRequired,
    };

    render() {
      const { role } = this.props.auth;

      if (allowedRoles.includes(role)) {
        return <ChildComponent {...this.props} />;
      }
      return <Unauthorized {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    state,
    auth: selectors.getAuth(state),
  });

  return connect(mapStateToProps)(ComposedComponent);
};

