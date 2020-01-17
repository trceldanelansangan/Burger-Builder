import * as actionTypes from '../actions/actionTypes'

export const addIngredients = ingredientName => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
}

export const removeIngredients = ingredientName => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName
    }
}

const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const initIngredients = ingredients => {
    return dispatch => {
        dispatch(setIngredients(ingredients))
    }
}

export const resetPrice = () => {
    return {
        type: actionTypes.RESET_PRICE
    }
}