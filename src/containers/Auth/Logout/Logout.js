import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as actionTypes from './../../../store/actions'

class Logout extends Component{

    componentDidMount(){
        this.props.logout()
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actionTypes.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)