import React from 'react';
import PropTypes from 'prop-types';

const Unauthorized = props => (
  <div className="container-fluid">
    <div className="jumbotron" style={{ marginTop: 16, textAlign: 'center' }}>
      <h3>Sorry but you are not authorized to view that content.</h3>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <button className="btn btn-primary" onClick={() => props.history.push('/')}>
          Home
      </button>
      <button className="btn btn-primary" onClick={() => props.history.goBack()} style={{ marginLeft: '15px' }}>
          Back
      </button>
    </div>
  </div>
);


Unauthorized.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Unauthorized;
