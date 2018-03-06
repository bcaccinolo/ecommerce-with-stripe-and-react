import React, { Component } from 'react';

class Alert extends Component {
  render() {
    if (this.props.msg === '') {
      return '';
    } else {
      return (
        <div className={this.cssClasses()} role="alert">
          <span>{this.props.msg}</span>
        </div>
      );
    }
  }

  cssClasses() {
    const typeClass = 'alert-' + this.props.style;
    return ['alert', typeClass].join(', ');
  }
}

export default Alert;
