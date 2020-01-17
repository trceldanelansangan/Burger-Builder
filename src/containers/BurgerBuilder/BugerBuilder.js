import React, { Component } from "react";
import Auxiliary from "./../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import axios from "./../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  purchaseHandaler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    } else {
      this.props.onAuthRedirect('/checkout')
      this.props.history.push('/auth')
    }
  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  updatePurchasable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingr => {
        return ingredients[ingr];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  componentDidMount() {
    axios
      .get("ingredients.json")
      .then(response => {
        this.props.initIngredients(response.data);
        this.setState({ error: false });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    const disabledInfo = { ...this.props.ingredientsList };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded...</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredientsList) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredientsList} />
          <BuildControls
            isAuthenticated={this.props.isAuthenticated}
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabled={disabledInfo}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ingredientsList)}
            purchasing={this.purchaseHandaler}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredientsList}
          totalPrice={this.props.totalPrice}
          clicked={this.purchaseCancel}
          purchaseContinue={this.purchaseContinue}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredientsList: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    isAuthenticated: state.authReducer.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredientName =>
      dispatch(actionTypes.addIngredients(ingredientName)),
    removeIngredient: ingredientName =>
      dispatch(actionTypes.removeIngredients(ingredientName)),
    initIngredients: ingredients =>
      dispatch(actionTypes.initIngredients(ingredients)),
      onAuthRedirect: path => dispatch(actionTypes.authRedirect(path)) 
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
