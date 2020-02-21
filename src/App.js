import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
