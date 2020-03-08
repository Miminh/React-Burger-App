import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import * as actions from './store/actions/index';

import Auth from './container/Auth/Auth'
import Logout from './container/Auth/Logout/Logout'

class App extends Component {

  componentDidMount(){
    this.props.onReloadPage();
  }

  render() {
    let route = (
      <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/auth" component={Auth}/>
      </Switch>
    )

    if(this.props.isAuthenticated){
      route = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" component={Orders}/>
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    onReloadPage : () => {dispatch(actions.checkAuthState())}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
