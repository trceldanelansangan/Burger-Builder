import React, { Component } from "react";
import Layout from "./hoc/layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BugerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions";

class App extends Component {

  componentDidMount() {
    this.props.checkAuthState()
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actionTypes.checkAuthState())
  };
};

export default connect(null, mapDispatchToProps)(App);
