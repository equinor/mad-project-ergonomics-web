import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    leftIcon: PropTypes.func,
    rightIcon: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    leftIcon: null,
    rightIcon: null,
    onBlur: null,
    onFocus: null,
  };

  onChange() {
    this.props.onChange();
  }
  focus() {
    this.props.onFocus();
  }
  blur() {
    this.props.onBlur();
  }
  renderIcon(Icon) {
    return (
      <span className="input-group-addon">
        <Icon />
      </span>
    );
  }

  render() {
    const {
      leftIcon,
      rightIcon,
    } = this.props;
    return (
      <div className="input-group">
        { !!leftIcon && this.renderIcon(leftIcon) }
        <input
          ref={(elm) => { this.inputElement = elm; }}
          type="text"
          className="form-control"
          {...omit(this.props, ['leftIcon', 'rightIcon'])}
          name={this.props.name}
        />
        { !!rightIcon && this.renderIcon(rightIcon) }
      </div>
    );
  }
}

