import React, { Component } from "react";
import styles from "./BurgerIngredients.css";
import PropTypes from "prop-types";

class BurgerIngredients extends Component {
  render() {
    let ingredients = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingredients = <div className={styles.BreadBottom}></div>;
        break;
      case "bread-top":
        ingredients = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1}></div>
            <div className={styles.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        ingredients = <div className={styles.Meat}></div>;
        break;
      case "cheese":
        ingredients = <div className={styles.Cheese}></div>;
        break;
      case "bacon":
        ingredients = <div className={styles.Bacon}></div>;
        break;
      case "salad":
        ingredients = <div className={styles.Salad}></div>;
        break;
      default:
        ingredients = null;
    }
    return ingredients;
  }
}

BurgerIngredients.propTypes = {
    type : PropTypes.string.isRequired
}

export default BurgerIngredients;
