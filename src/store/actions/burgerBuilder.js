import * as actionTypes from './actionTypes';
import axios from '../../order-instance';

export const addIngredient = (name)=>{
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}


export const removeIngredient = (name)=>{
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
}

export const setIngredients = (ingredients) =>{
    return{
        type : actionTypes.SET_INGREDIENT,
        ingredients : ingredients
    }
}

export const fetchIngredientFail = ()=>{
    return {
        type : actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const fetchIngredients = ()=>{
    return dispatch=>{
        axios.get('https://reac-mimin-2-burger.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch((error) =>{
                this.setState({error : error})
            });

    }
}

