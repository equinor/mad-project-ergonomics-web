import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function Toggle({ value, onToggle, labelOff, labelOn, disabled }) {
  const [enabled, setEnabled] = useState(value);
  return <div>
    <button
      disabled={disabled}
      onClick={() => {
        const nextVal = !enabled;
        onToggle(nextVal);
        setEnabled(nextVal);
      }}
      style={{
        opacity: disabled ? 0.5 : 1,
        backgroundColor: 'white',
        border: 'none',
        display: 'flex',
        flexDirection: 'row',
      }}>
      {!!labelOff &&
      <p style={{
        color: !enabled && '#007079',
        margin: 'auto',
        textDecoration: !enabled && 'underline',
      }}>{labelOff}</p>
      }
      <div style={{
        backgroundColor: '#C8E0E2',
        border: '1px solid #BFBFBF',
        borderRadius: 12.5,
        display: 'flex',
        height: 25,
        justifyContent: enabled && 'flex-end',
        margin: 8,
        width: 43,
      }}>
        <div
          style={{
            backgroundColor: '#007079',
            borderRadius: 12.5,
            height: 23,
            width: 25,
          }}/>
      </div>
      {!!labelOn &&
      <p style={{
        color: enabled && '#007079',
        margin: 'auto',
        textDecoration: enabled && 'underline',
      }}>{labelOn}</p>
      }
    </button>
  </div>;
}

Toggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  labelOff: PropTypes.string,
  labelOn: PropTypes.string,
  disabled: PropTypes.bool
};
Toggle.defaultProps = { labelOff: null, labelOn: null, disabled: false };
