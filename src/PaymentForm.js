import { connect } from 'react-redux';
import PaymentFormComponent from './PaymentFormComponent';

const mapStateToProps = state => {
  return {
    clientName: state.clientName,
    totalPrice: state.quantity * state.unitPrice * 100
  };
};

const PaymentForm = connect(
  mapStateToProps
)(PaymentFormComponent);

export default PaymentForm;
