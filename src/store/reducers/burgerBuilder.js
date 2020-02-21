import * as actionType from './action';

const initialState = {
    ingredients :{
        meat:0,
        bacon:0,
        salad:0,
        cheese:0
    },
    totalPrice :4.0
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
            }
        default:
            return state;
    }
}

export default reducer;