import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        token : token,
        id : id
    }
}

export const authFail = (error) =>{
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const authLogoutHelper = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("userId");
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}


export const authLogout = (expireTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            console.log(expireTime);
            dispatch(authLogoutHelper());
        },expireTime * 1000)
    }
}

export const auth = (email, password, isSignUp) =>{
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABwm1N5oG2AIAf8Duq-PU6ZfbopD5Xz_0";
        if(!isSignUp){
           url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABwm1N5oG2AIAf8Duq-PU6ZfbopD5Xz_0"; 
        }
        axios.post(url, authData)
        .then(response =>{
            console.log(response.data);
            const expireDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expireDate", expireDate);
            localStorage.setItem("userId", response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authLogout(response.data.expiresIn))
        }).catch(err => {
            
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const authRedirect = () =>{
    return {
        type : actionTypes.AUTH_REDIRECT
    }
}

export const checkAuthState = ()=>{
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(authLogoutHelper());
        }
        else{
            const expireDate =  new Date(localStorage.getItem("expireDate"));
            if(expireDate <= new Date()){
                dispatch(authLogoutHelper());
            }
            else{
                dispatch(authSuccess(token, localStorage.getItem("userId")));
                dispatch(authLogout((expireDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}