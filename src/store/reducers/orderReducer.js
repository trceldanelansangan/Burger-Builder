import * as actionTypes from './../actions/actionTypes'

const initialState = {
    orders : null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_ORDERS:
            console.log('entered')
            return {
                ...state,
                orders : action.orderList
            }
        default:
            console.log('exit')
            return {
                ...state
            }
    }
}

export default reducer