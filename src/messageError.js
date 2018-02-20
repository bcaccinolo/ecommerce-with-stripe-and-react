import React, { Component } from 'react';

class Error extends Component {
  render() {
    if (this.props.msg === '') {
      return '';
    } else {
      return (
        <div className="alert alert-danger" role="alert">
          <span>{this.props.msg}</span>
        </div>
      );
    }
  }
}

export default Error;
