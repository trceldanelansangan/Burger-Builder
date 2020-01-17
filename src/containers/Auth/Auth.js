import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "./../../components/UI/Inputs/Inputs";
import Button from "./../../components/UI/Button/Button";
import Spinner from './../../components/UI/Spinner/Spinner'

import classes from "./Auth.css";
import * as actionTypes from "./../../store/actions";
import { Redirect } from "react-router";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        validity: {
          required: false,
          isEmail: false
        },
        valid: false,
        touched: false,
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        validity: {
          required: false,
          minLength: 6
        },
        valid: false,
        touched: false,
        value: ""
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if(this.props.buildingBurger && this.props.authRedirectPath === '/'){
      this.props.onAuthRedirect()
    }
  }

  inputChangeHandler = (event, elementIdentifier) => {
    const updatedAuthForm = { ...this.state.controls };
    const updatedElement = { ...updatedAuthForm[elementIdentifier] };
    updatedElement.value = event.target.value;
    updatedElement.touched = true;
    updatedElement.valid = this.checkValidity(
      updatedElement.value,
      updatedElement.validity
    );
    updatedAuthForm[elementIdentifier] = updatedElement;
    this.setState({
      controls: updatedAuthForm
    });
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.authStart(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  buttonSwitchHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let formData = formElementArray.map(elements => {
      return (
        <Input
          key={elements.id}
          inputIdentifier={elements.id}
          elementType={elements.config.elementType}
          elementConfig={elements.config.elementConfig}
          value={elements.config.value}
          invalid={!elements.config.valid}
          shouldValidate={elements.config.validity}
          touched={elements.config.touched}
          change={event => this.inputChangeHandler(event, elements.id)}
        />
      );
    });

    if(this.props.loading){
        formData = <Spinner />
    }

    let errorMessage = null

    if(this.props.error){
        errorMessage = this.props.error.message
    }

    let authRedirect = null

    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.AuthData}>
        {authRedirect}
        <form onSubmit={this.submitFormHandler}>
            {errorMessage}
          {formData}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.buttonSwitchHandler}>
          {this.state.isSignup ? "Switch to SIGN IN" : "Switch to SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return{
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated : state.authReducer.token !== null,
        authRedirectPath : state.authReducer.authRedirectPath,
        buildingBurger: state.burgerReducer.buildingBurger
    }
}

const mapDispatchToProps = dispatch => {
  return {
    authStart: (email, password, isSignup) => dispatch(actionTypes.auth(email, password, isSignup)),
    onAuthRedirect: () => dispatch(actionTypes.authRedirect('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
