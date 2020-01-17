import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients : null,
    totalPrice : 0,
    buildingBurger : false
}

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                buildingBurger: true
            }
        case actionTypes.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                buildingBurger: true
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                buildingBurger: false
            }
        case actionTypes.RESET_PRICE:
            return {
                ...state,
                totalPrice: 0
            }
        default:
            return state
    }
}

export default reducer