import React, { Component } from 'react';

class Success extends Component {
  render() {
    if (this.props.msg === '') {
      return '';
    } else {
      return (
        <div className="alert alert-success" role="alert">
          <span>{this.props.msg}</span>
        </div>
      );
    }
  }
}

export default Success;
