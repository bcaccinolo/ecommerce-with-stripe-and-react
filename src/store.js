import { combineReducers, createStore } from 'redux';

// reducer to update the quantity
function quantity(state = 1, action) {
  if (action.type === 'INCREASE') {
    return state + 1;
  }
  if (action.type === 'DECREASE') {
    let newState = state - 1;
    if (newState < 1) { return 1; }
    return newState;
  }
  return state;
}

// reducer to update unit price
function unitPrice(state = 9.99, action) {
  if (action.type === 'UPDATE_UNIT_PRICE') {
    return action.price;
  }
  return state;
}

function clientName(state = 'John Doe', action) {
  if (action.type === 'UPDATE_CLIENT_NAME') {
    return action.name;
  }
  return state;
}

// composition of the state with reducers
const updateState = combineReducers({
  quantity,
  unitPrice,
  clientName
});

export default createStore(updateState);