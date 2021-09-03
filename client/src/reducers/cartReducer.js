import { cartConstant } from "../actions/constant";

const initialState = {
    cartItems: {},
    updatingCart: false,
    error: null
}

export const cartReducer = (state= initialState, action) => {
    switch(action.type) {
        case cartConstant.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case cartConstant.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;
        case cartConstant.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstant.RESET_CART:
            state = {
                ...initialState
            }
    }
    return state;
}