import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Version from '../components/common/Version';
import colors from '../theme/colors';
import * as selectors from '../store/selectors';

class MainPage extends Component {
  static propTypes = {
    history: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  navigateTo(route) {
    this.props.history.push(route);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="jumbotron" style={{ marginTop: 16, textAlign: 'center' }}>
            <h1>Delete this component and create an awesome app :-)</h1>
            <Version />
          </div>
        </div>

        <h2 style={{ margin: '15px', fontWeight: 'bold' }}>User Status</h2>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-3"
              style={{
                marginLeft: '15px',
                border: '2px solid',
                borderColor: colors.EQUINOR_PROMINENT,
                borderRadius: '3px',
                backgroundColor: colors.EQUINOR_LIGHT_GRAY,
                color: colors.EQUINOR_GRAY }}
            >
              <p style={{ marginTop: '15px' }}>User: {this.props.auth.user.displayableId}</p>
              <p>Role: {this.props.auth.role}</p>
              <p>Authentication Status: {this.props.auth.authStatus}</p>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: '15px', marginTop: '40px' }}>
          <h2 style={{ marginBottom: '15px', fontWeight: 'bold' }}>Routing and Authorization</h2>
          <p>This app uses role based authorization (not to be confused with Authentication).</p>
          <p>Authorization is provided by the withAuthorization Higher Order Component (HOC).</p>
          <p>Routing for the app is controlled from routes &gt; index.js</p>
          <p>
            <div>Routes can be public or protected
              (made accessible for only certain user role types).
            </div>
            <div>
              By default the app has the following roles: user, manager and admin.
              Use them as is or change them roles to suit your needs.
            </div>
          </p>
          <h2 style={{ marginTop: '40px', marginBottom: '15px', fontWeight: 'bold' }}>Routing Demo</h2>
          <p>Checkout the routes file to see how to protect a route.</p>
          <button className="btn btn-primary" onClick={() => this.navigateTo('/public-feature')}>
            Public Feature
          </button>
          <button className="btn btn-primary" onClick={() => this.navigateTo('/authorized-feature')} style={{ marginLeft: '15px' }}>
            Protected Feature
          </button>
          <button className="btn btn-primary" onClick={() => this.navigateTo('/unauthorized-feature')} style={{ marginLeft: '15px' }}>
            Unauthorized Feature
          </button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: selectors.getAuth(state),
});

export default connect(mapStateToProps)(MainPage);
