import * as actionTypes from '../actions/actionTypes';

let initialState = {
    token : null,
    userId : null,
    loading : false,
    error : null,
    authRedirectPath : '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START : 
            return {
                ...state,
                loading : true,
                error : null
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading : false,
                token : action.token,
                userId : action.id,
                error : null
            };
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error : action.error,
                loading : false
            }
        case actionTypes.AUTH_LOGOUT :
            return {
                ...state,
                error : null,
                userId : null,
                token : null,
                authRedirectPath : '/'
            }
        case actionTypes.AUTH_REDIRECT:
            return {
                ...state,
                authRedirectPath : '/checkout'
            }
        default:
            return state;
    }
}

export default reducer;