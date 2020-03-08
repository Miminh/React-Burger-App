import * as actionTypes from './actionTypes';
import axios from '../../order-instance';

export const burgerPurchaseSucces = (id, orderData) => {
    return {
        type : actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const burgerPurchaseFail = (error)=> {
    return {
        type : actionTypes.BURGER_PURCHASE_FAIL,
        error : error
    }
}

export const burgerPurchaseStart= ()=>{
    return {
        type : actionTypes.BURGER_PURCHASE_START
    }
}

export const burgerPurchase = (orderData, token)=>{
    return dispatch =>{
        dispatch(burgerPurchaseStart);
        axios.post('/orders.json?auth='+token, orderData)
            .then(response => {
                dispatch(burgerPurchaseSucces(response.data, orderData))
            }).catch(error => {
                dispatch(burgerPurchaseFail(error))
            });
    }
}

export const purchaseInit = ()=>{
    return{
        type : actionTypes.PURCHASE_INIT
    }
}

export const loadOrderSuccess = (orders) =>{
    return {
        type : actionTypes.LOAD_ORDER_SUCCESS,
        orders : orders
    }
}

export const loadOrderFail= (error) =>{
    return {
        type : actionTypes.LOAD_ORDER_FAIL,
        error : error
    }
}

export const loadOrderStart = () => {
    return{
        type : loadOrderStart
    }
}

export const resetOrder = () =>{
    return {
        type : actionTypes.ORDER_RESET
    }
}

export const loadOrder = (token, userId) =>{
    return dispatch =>{
        dispatch(loadOrderStart());
        let paramQuery = "?auth=" + token + '&orderBy="userId"&equalTo="'+userId +'"';
        axios.get("/orders.json"+ paramQuery)
        .then(res => {
            console.log(res.data);
            let fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            dispatch(loadOrderSuccess(fetchedOrders));
        }).catch(err => {
            dispatch(loadOrderFail(err));
        });
    }
}


