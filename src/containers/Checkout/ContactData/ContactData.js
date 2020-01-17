import React, { Component } from "react";
import Button from "./../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "./../../../axios-orders";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import Input from "./../../../components/UI/Inputs/Inputs";
import withError from './../../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from './../../../store/actions'

import { connect } from 'react-redux'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        validity: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        validity: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP CODE"
        },
        validity: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        validity: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        validity: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      deliveryType: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        valid: true,
        validity: {},
      }
    },
    loading: false
  };

  proceedButtonHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }
    const orders = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customerData: formData
    };

    axios
      .post(`/orders.json?auth=${this.props.token}`, orders)
      .then(response => {
        if (response){
          this.props.resetPrice();
          this.setState({ loading: false, purchasing: false });
          this.props.history.push("/");
        }
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  inputChangeHandler = (event, elementIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedOrderForm[elementIdentifier] };
    updatedElement.value = event.target.value;
    updatedElement.touched = true
    updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validity)
    updatedOrderForm[elementIdentifier] = updatedElement;
    this.setState({
      orderForm: updatedOrderForm
    });
  };

  checkValidity = (value, rules) => {
    let isValid = true

    if (rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid
  }

  render() {
    let inputElementArray = [];
    for (let key in this.state.orderForm) {
      inputElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.proceedButtonHandler}>
        {inputElementArray.map(formElement => (
          <Input
            key={formElement.id}
            inputIdentifier={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validity}
            touched={formElement.config.touched}
            change={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success">Proceed</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    token: state.authReducer.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPrice: () => dispatch(actionTypes.resetPrice())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(ContactData,axios));
