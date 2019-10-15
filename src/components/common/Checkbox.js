import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckedIcon from 'react-icons/lib/md/check-box';
import UncheckedIcon from 'react-icons/lib/md/check-box-outline-blank';

const styles = {
  defaultButtonStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
};

export default class Checkbox extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.number,
    color: PropTypes.string,
    style: PropTypes.object,
    tabIndex: PropTypes.number,
  }

  static defaultProps = {
    disabled: false,
    style: {},
    size: 24,
    color: '#0185B7',
    tabIndex: 0,
    value: 'true',
  }

  render() {
    const {
      disabled,
      style,
      tabIndex,
      onChange,
      name,
      checked,
      size,
      color,
      value,
    } = this.props;
    return (
      <span
        className={['checkbox', disabled && 'disabled'].join(' ')}
        style={[styles.defaultButtonStyle, style]}
        role="button"
        tabIndex={disabled ? '' : tabIndex}
        onClick={() => !disabled && onChange({
          name,
          checked: !checked,
          value: checked && value,
        })}
      >
        { checked && <CheckedIcon size={size} color={color} />}
        { checked === false && (
          <UncheckedIcon size={size} color={color} />
        )}
      </span>
    );
  }
}

