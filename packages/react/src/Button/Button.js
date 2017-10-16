import React from 'react';
import PropTypes from 'prop-types';
import '../../styleguide/button.css';

class Button extends React.Component {
  render() {
    const { disabled, onClick, ...props } = this.props;
    return (
      <button className={disabled ? 'is-loading' : ''} onClick={!disabled ? onClick : () => {}} {...props}>
        {
          disabled ?
          <span>Loading...</span> :
          <span>Get Medipass health status</span>
        }
      </button>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {}
};

export default Button;
