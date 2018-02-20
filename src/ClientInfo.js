import { connect } from 'react-redux';
import ClientInfoComponent from './ClientInfoComponent';

const mapStateToProps = state => {
  return {
    clientName: state.clientName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateClientName: (e) => dispatch({type:'UPDATE_CLIENT_NAME', name: e.target.value})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientInfoComponent);
