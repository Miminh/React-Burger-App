import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients :null,
    totalPrice :4.0,
    error : false
}

const INGREDIENTS_PRICE = {
    meat:1.3,
    bacon:0.7,
    salad:0.5,
    cheese:0.6
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] +1
                },
                totalPrice : state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] -1
                },
                totalPrice : state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionType.SET_INGREDIENT : 
            return {
                ...state,
                ingredients : action.ingredients,
                error : false,
                totalPrice : 4.0
            };
        case actionType.FETCH_INGREDIENT_FAILED:
            return{
                ...state,
                error : true
            }
        default:
            return state;
    }
}

export default reducer;