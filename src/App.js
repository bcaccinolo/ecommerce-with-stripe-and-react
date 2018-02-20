import React, { Component } from 'react';

import Product from './Product';
import ClientInfo from './ClientInfo';
import Payment from './Payment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Product/>
        <ClientInfo/>
        <Payment/>
      </div>
    );
  }
}

export default App;
