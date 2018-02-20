import { connect } from 'react-redux';
import ProductComponent from './ProductComponent';

const mapStateToProps = state => {
  return {
    quantity: state.quantity,
    totalPrice: state.quantity * state.unitPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clickPlus:  () => dispatch({type:'INCREASE'}),
    clickMinus: () => dispatch({type:'DECREASE'})
  };
};

const Product = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent);

export default Product;
