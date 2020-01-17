import React, { Component } from "react";
import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import { connect } from 'react-redux'

class Checkout extends Component {

  purchaseContinue = () => {
      this.props.history.replace('/checkout/contact-data')
  };

  purchaseCancel = () => {
    this.props.history.goBack();
  };

  render() {

    let summary = <Redirect to="/" />
    if(this.props.ingredientsList){
      summary = (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredientsList}
          purchaseContinue={this.purchaseContinue}
          purchaseCancel={this.purchaseCancel}
        />

        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredientsList : state.burgerReducer.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
