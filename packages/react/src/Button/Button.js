import React, { Component } from 'react';
import '@jmoxey/styleguide/button.scss';

class Button extends Component {
  render = () => {
    const { children } = this.props;
    return (
      <button>{children}</button>
    );
  }
}

export default Button;

