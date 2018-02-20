import React, { Component } from 'react';

class ClientInfoComponent extends Component {
  render() {
    return (
      <div>
        <div className="card w-50 mb-3" >
          <div className="card-block">
            <h4 className="card-title">User Info</h4>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" id="exampleInputEmail1"
                onChange={this.props.updateClientName} placeholder={this.props.clientName}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientInfoComponent;
