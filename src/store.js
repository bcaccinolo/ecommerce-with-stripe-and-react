import { combineReducers, createStore } from 'redux';

// reducer to update the quantity
function quantity(state = 1, action) {
  switch (action.type) {
  case 'INCREASE':
    return state + 1;
  case 'DECREASE':
    return Math.max(state - 1, 1);
  default:
    return state;
  }
}

// reducer to update unit price
function unitPrice(state = 9.99, action) {
  switch (action.type) {
  case 'UPDATE_UNIT_PRICE':
    return action.price;
  default:
    return state;
  }
}

function clientName(state = 'John Doe', action) {
  switch (action.type) {
  case 'UPDATE_CLIENT_NAME':
    return action.price;
  default:
    return state;
  }
}

// composition of the state with reducers
const updateState = combineReducers({
  quantity,
  unitPrice,
  clientName
});

export default createStore(updateState);