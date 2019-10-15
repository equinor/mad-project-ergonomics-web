import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

export default class Dropdown extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    addEmpty: PropTypes.bool,
    emptyText: PropTypes.string,
    emptyValue: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    addEmpty: true,
    emptyText: '',
    emptyValue: '',
    options: [],
  }

  render() {
    return (
      <select
        className="dropdown"
        {...omit(this.props, ['addEmpty', 'emptyText', 'emptyValue', 'options'])}
        name={this.props.name}
        ref={(elm) => { this.elementRef = elm; }}
        onChange={() => this.props.onChange(this.elementRef)}
      >
        { this.props.addEmpty && (
          <option value={this.props.emptyValue}>{this.props.emptyText}</option>
        )}
        {this.props.options.map(op => (
          <option key={`${this.props.name}_option_${op.value}`} value={op.value}>{op.name}</option>
        ))}
      </select>);
  }
}

