import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => props.addIngredient(control.type)}
        removed={() => props.removeIngredient(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchasing}>
     {props.isAuthenticated ? 'Order Now' : 'Signin to Order'}
    </button>
  </div>
);

export default buildControls;
