import * as actionTypes from '../actions/actionTypes';


const initialState = {
    order :[],
    loading : false,
    purchased : false
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.BURGER_PURCHASE_START:
            return{
                ...state,
                loading : true
            };
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            const addOrder = {
                ...action.orderData,
                id : action.orderId
            }
            return {
                ...state,
                order : state.order.concat(addOrder),
                loading : false,
                purchased : true
            };
        case actionTypes.BURGER_PURCHASE_FAIL:
            return {
                ...state,
                loading : false
            };
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased : false
            }
        case actionTypes.LOAD_ORDER_SUCCESS :
            return{
                ...state,
                loading : false,
                order : action.orders
            }
        case actionTypes.LOAD_ORDER_FAIL:
            return{
                ...state,
                loading : false
            }
        case actionTypes.LOAD_ORDER_START:
            return{
                ...state,
                loading : true
            }
        case actionTypes.ORDER_RESET : 
        return{
            ...state,
            order : []
        }
        default :
            return state; 
    }
}


export default reducer;