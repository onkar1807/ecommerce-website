import axios from "../helper/axios";
import { cartConstant, userConstant } from "./constant"


export const getAddress = () => {
    return async (dispatch) => {

        try {
            const res = await axios.get('/user/getaddress');
            dispatch({ type: userConstant.GET_USER_ADDRESS_REQUEST });

            if(res.status === 200) {
                const {
                    userAddress: {
                        address
                    }
                } = res.data
                dispatch({
                    type: userConstant.GET_USER_ADDRESS_SUCCESS,
                    payload: { address }
                })
            } else {
                dispatch({
                    type: userConstant.GET_USER_ADDRESS_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const addAddress = (payload) => {
    return async (dispatch) => {

        try {
            
            const res = await axios.post('/user/address/create', {payload});
            dispatch({ type: userConstant.ADD_USER_ADDRESS_REQUEST });

            if(res.status === 200) {
                const {
                    address: {
                        address
                    }
                } = res.data
                dispatch({
                    type: userConstant.ADD_USER_ADDRESS_SUCCESS,
                    payload: { address }
                })
            } else {
                dispatch({
                    type: userConstant.ADD_USER_ADDRESS_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addOrder = (payload) => {
    return async (dispatch) => {

        try {
            
            const res = await axios.post('/addOrder', payload);
            dispatch({ type: userConstant.ADD_USER_ORDER_REQUEST });
            console.log(res)
            if(res.status === 200) {
                const { orders } = res.data;

                dispatch({
                    type: cartConstant.RESET_CART
                })

                dispatch({
                    type: userConstant.ADD_USER_ORDER_SUCCESS,
                    payload: { orders }
                })
            } else {
                dispatch({
                    type: userConstant.ADD_USER_ORDER_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getOrders = () => {
    return async (dispatch) => {

        try {
            
            const res = await axios.get('/getOrders');
            dispatch({ type: userConstant.GET_USER_ORDER_REQUEST });

            if(res.status === 200) {
                const { orders } = res.data
                dispatch({
                    type: userConstant.GET_USER_ORDER_SUCCESS,
                    payload: { orders }
                })
            } else {
                dispatch({
                    type: userConstant.GET_USER_ORDER_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const getOrder = (payload) => {
    return async (dispatch) => {

        try {
            dispatch({ type: userConstant.GET_USER_ORDER_DETAILS_REQUEST })
            
            const res = await axios.post("/getOrder", payload)
            // console.log(res)
            if(res.status === 200) {
                const { order } = res.data;
                dispatch({
                    type: userConstant.GET_USER_ORDER_DETAILS_SUCCESS,
                    payload: { order }
                })
            }else {
                dispatch({
                    type: userConstant.GET_USER_ORDER_DETAILS_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}