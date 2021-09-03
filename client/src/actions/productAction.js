import axios from '../helper/axios'
import {  productConstant } from './constant';


export const createProduct = (slug) => {
    return async (dispatch) => {
        
        const res = await axios.get(`/products/${slug}`);
        if(res.status === 200) {
            dispatch({
                type: productConstant.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: productConstant.GET_PRODUCT_BY_SLUG_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const pageAction = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
           
            dispatch({ type: productConstant.GET_PRODUCT_BY_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstant.GET_PRODUCT_BY_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstant.GET_PRODUCT_BY_SLUG_FAILURE,
                    payload: { error }
                });
            }
        } catch(error) {
            console.log(error)
        }

    }
}

export const getProductById = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type:productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST })

            const { productId } = payload.params;
            const res = await axios.get(`/product/${productId}`);
           
            if(res.status === 200) {
                dispatch({
                    type: productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                    payload: { productDetails: res.data.product }
                })
            } else {
                dispatch({
                    type: productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}