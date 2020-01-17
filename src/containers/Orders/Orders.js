import React, { Component } from 'react'
import Order from './../../components/Order/Order'
import axios from './../../axios-orders'
import withError from './../../hoc/withErrorHandler/withErrorHandler'
import Spinner from './../../components/UI/Spinner/Spinner'

import { connect } from 'react-redux'
import * as actionTypes from './../../store/actions/index'

class Orders extends Component {

    state = {
        loading : true
    }

    componentDidMount(){

        axios.get('/orders.json?auth=' + this.props.token)
            .then(res => {
                const fetchedOrders = []
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.props.initOrders(fetchedOrders)
                this.setState({ loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {

        let orders = []

        if(this.props.orderList){
            orders =  this.props.orderList.map(orders => (
                <Order 
                    key={orders.id}
                    ingredients={orders.ingredients}
                    price={orders.totalPrice}
                />
            ))
        }

        if(this.state.loading){
            orders = <Spinner />
        }

        return (
            <div>
               {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orderList: state.orderReducer.orders,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initOrders: (orderList) => dispatch(actionTypes.initOrderList(orderList)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders,axios))