import React, { Component } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe } from 'react-stripe-elements';
import queryString from 'query-string';
import Error from './messageError';
import Success from './messageSuccess';

class _Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: ''
    };
  }

  handleSubmit(ev) {
    ev.preventDefault();

    this.props.stripe.createToken({name: this.props.clientName})
      .then(result => {
        if(typeof(result.error) !== 'undefined') {
          this.setState({ error: result.error.message, success: ''});
        } else {
          this.stripeCreateCharge(result.token, this.props.totalPrice);
        }
      });
  }

  stripeCreateCharge(token, amount) {
    const params = { token: token.id, amount: amount };
    const qParams = queryString.stringify(params);
    const url = ['/api', qParams].join('?');

    fetch(url)
      .then(response => response.json())
      .then(val => {
        if (val.ok) {
          return val.message;
        } else {
          throw val.message;
        }
      })
      .then(success => this.setState({success: success, error: ''}))
      .catch(error => this.setState({error: error, success: ''}));
  }

  render() {
    return (
      <form onSubmit={(ev) => this.handleSubmit(ev)}>

        <Error msg={this.state.error} />
        <Success msg={this.state.success} />

        <div className="form-group">
          <label>CardNumberElement</label>
          <CardNumberElement { ...this.createCssOptions() } />
        </div>

        <div className="form-group">
          <label>CardExpiryElement</label>
          <CardExpiryElement { ...this.createCssOptions() } />
        </div>

        <div className="form-group">
          <label>CardCVCElement</label>
          <CardCVCElement { ...this.createCssOptions() } />
        </div>

        <button type="submit" className="btn btn-primary">Pika Pay!</button>
      </form>
    );
  }

  createCssOptions()  {
    return {
      classes: {
        base: 'form-control'
      },
      style: {
        base: {
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146'
        },
      },
    };
  }
}

export default injectStripe(_Form);
