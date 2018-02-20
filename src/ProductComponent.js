import React, { Component } from 'react';

class ProductComponent extends Component {
  render() {
    return (
      <div>
        <div className="card w-50 mt-3 mb-3" >

          <div className="card-header">
            <img className="card-img-top" src="/img/pikachu.jpg" alt="product"/>
          </div>

          <div className="card-block">
            <h4 className="card-title">Pikachu</h4>

            <p className="card-text">
            It occasionally uses an electric shock to recharge a fellow Pikachu that is in a weakened state.
            </p>

            <div className="input-group mb-2">
              <span className="input-group-btn">
                <button onClick={() => this.props.clickMinus()} className="btn btn-secondary" type="button">-</button>
              </span>
              <input type="text" className="form-control" value={this.props.quantity} readOnly />
              <span className="input-group-btn">
                <button onClick={() => this.props.clickPlus()} className="btn btn-secondary" type="button">+</button>
              </span>
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="sizing-addon2">$</span>
              <input type="text" className="form-control" aria-describedby="sizing-addon2" value={this.props.totalPrice} readOnly/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ProductComponent;
