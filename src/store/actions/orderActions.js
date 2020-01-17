import * as actionTypes from './actionTypes'

const setOrders = orderList => {
    return {
        type: actionTypes.SET_ORDERS,
        orderList
    }
}

export const initOrderList = orderList => {
    return dispatch => {
        dispatch(setOrders(orderList))
    }
}