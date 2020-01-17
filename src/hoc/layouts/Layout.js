import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import styles from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

import { connect } from 'react-redux'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () => {
        this.setState({ showSideDrawer: false })
    }

    showSideDrawer = () => {
        this.setState(previousState => {
          return { showSideDrawer: !previousState.showSideDrawer}
        })
    }

  render() {
    return (
      <Auxiliary>
        <Toolbar showSideDrawer={this.showSideDrawer} isAuthenticated={this.props.isAuthenticated}/>
        <SideDrawer showSideDrawer={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawer} isAuthenticated={this.props.isAuthenticated}/>
        <main className={styles.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
