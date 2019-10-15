import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    callback: PropTypes.func,
  };

  static defaultProps = {
    callback: (error, info) => {
      console.log(error, info); // eslint-disable-line
    },
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    this.props.callback(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>:-( Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
