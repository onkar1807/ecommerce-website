import { authConstant, cartConstant, signupConstant } from "./constant"
import axios from '../helper/axios'


export const signup = (user) => {
    return async (dispatch) => {

        dispatch({ type: signupConstant.SIGNUP_REQUEST });

        const res = await axios.post('/signup', user);
        console.log(res)
        if(res.status === 201) {
            dispatch({ type: signupConstant.SIGNUP_SUCCESS });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: signupConstant.SIGNUP_FAILED,
                payload: { error: res.data.error }
            })  
        }
    }
}

export const login = (user) => {
   
    return async (dispatch) => {

        dispatch({ type: authConstant.LOGIN_REQUEST });

        const res = await axios.post('/signin', {
            ...user
        });
        console.log(res)
      
        if(res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: { 
                    user, token
                }
            });
        } else {
            if(res.status === 400) {
                dispatch({
                    type: authConstant.LOGIN_FAILED,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}



export const isUserLoggedIn = () => {
    return async(dispatch) => {
        const token = localStorage.getItem('token');
        if(token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: { 
                    user, token
                }
            });
        } else {
            dispatch({
                type: authConstant.LOGIN_FAILED,
                payload: { error: 'User needs to login' }
            })
        }
    }
}

export const Signout = () => {
    return async (dispatch) => {

        // localStorage.removeItem('user');
        // localStorage.removeItem('token');
        localStorage.clear();
        dispatch({ type: authConstant.LOGOUT_SUCCESS });
        dispatch({ type: cartConstant.RESET_CART });

        // const res = await axios.post('/signout');
        // if(res.status === 200) {
        //     localStorage.clear();
        //     const { message } = res.data;
        //     dispatch({
        //         type: authConstant.LOGOUT_SUCCESS,
        //         payload: { message }
        //     })
        // } else {
        //     dispatch({
        //         type: authConstant.LOGOUT_FAILED,
        //         payload: { error: res.data.error }
        //     })
        // }
    }
}