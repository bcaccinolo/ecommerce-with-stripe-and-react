import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PaymentForm from './PaymentForm';
import pjson from '../package.json';

class Payment extends Component {
  render() {
    return (
      <div className="card w-50 mb-3">
        <div className="card-block">
          <h4 className="card-title">Payment Form</h4>

          <StripeProvider apiKey={pjson.stripePublicKey}>
            <div className="Checkout">
              <Elements>
                <PaymentForm/>
              </Elements>
            </div>
          </StripeProvider>

        </div>
      </div>
    );
  }
}

export default Payment;
