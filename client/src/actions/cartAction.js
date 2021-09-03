import axios from "../helper/axios";
import Store from '../store/Store'
import { cartConstant } from "./constant";


const getCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstant.ADD_TO_CART_REQUEST })

            const res = await axios.get('/user/getCartItems');
            if (res.status === 200) {
                const { cartItems } = res.data;
                
                if (cartItems) {
                    dispatch({
                        type: cartConstant.ADD_TO_CART_SUCCESS,
                        payload: { cartItems }
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const addToCart = (product, newqty = 1) => {
    return async (dispatch) => {

        try {
            const {
                cart: { cartItems },
                auth
            } = Store.getState()

            const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newqty) : 1
            cartItems[product._id] = {
                ...product,
                qty
            }

            if (auth.authenticate) {
                dispatch({ type: cartConstant.ADD_TO_CART_REQUEST })

                const payload = {
                    cartItems: [{
                        product: product._id,
                        quantity: qty
                    }]
                }
                // console.log(payload);
                const res = await axios.post('/user/cart/add-to-cart', payload);
                // console.log(res)
                if (res.status === 200) {
                    dispatch(getCartItems())
                }
            } else {
                localStorage.setItem('cart', JSON.stringify(cartItems))
            }
            dispatch({
                type: cartConstant.ADD_TO_CART_SUCCESS,
                payload: { cartItems }
            })
        } catch (error) {
            console.log(error.response)
        }
    }
}


export const updateCart = () => {
    return async (dispatch) => {

        const { auth } = Store.getState();
        const cartItems = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : null

        if (auth.authenticate) {
            localStorage.removeItem('cart');
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key, idx) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id
                        }
                    })
                };
                if (Object.keys(cartItems).length > 0) {
                    const res = await axios.post('/user/cart/add-to-cart', payload);
                    if (res.status === 200) {
                        dispatch(getCartItems());
                    }
                }
            } else {
                if (cartItems) {
                    dispatch({
                        type: cartConstant.ADD_TO_CART_SUCCESS,
                        payload: { cartItems }
                    })
                }
            }
        }
    }
}

export const removeCartItem = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstant.REMOVE_CART_ITEM_REQUEST });
            const res = await axios.post('/user/cart/removeItem', {payload});

            if(res.status === 200) {
                dispatch({ type: cartConstant.REMOVE_CART_ITEM_SUCCESS });
                dispatch(getCartItems());
            }else {
                dispatch({
                    type: cartConstant.REMOVE_CART_ITEM_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

export {
    getCartItems
}

