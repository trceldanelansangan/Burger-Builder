import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Btn from './../../UI/Button/Button'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingr => {
    return (
      <li key={ingr}>
        <span style={{ textTransform: "capitalize" }}>{ingr}: </span>
        {props.ingredients[ingr]}
      </li>
    );
  });

  return (
    <Auxiliary>
      <div>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
      Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
    </p>
        <p>Continue to checkout?</p>
        <Btn btnType="Success" clicked={props.purchaseContinue}>Proceed</Btn>
        <Btn btnType="Danger" clicked={props.clicked}>Cancel</Btn>
      </div>
    </Auxiliary>
  );
};

export default orderSummary