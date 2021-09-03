import { userConstant } from "../actions/constant"

const initialState = {
    address: [],
    error: null,
    loading: false,
    orders: [],
    orderFetching: false,
    orderDetails: []
}

export const userReducers = (state = initialState, action) => {

    switch(action.type){
        case userConstant.GET_USER_ADDRESS_REQUEST:
            state ={
                ...state,
                loading: true
            }
            break;
        case userConstant.GET_USER_ADDRESS_SUCCESS: 
            state = {
                ...state,
                loading: false,
                address: action.payload.address
            }
            break;
        case userConstant.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case userConstant.ADD_USER_ADDRESS_REQUEST:
            state ={
                ...state,
                loading: true
            }
            break;
        case userConstant.ADD_USER_ADDRESS_SUCCESS: 
            state = {
                ...state,
                loading: false,
                address: action.payload.address
            }
            break;
        case userConstant.ADD_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case userConstant.GET_USER_ORDER_REQUEST:
            state ={
                ...state,
                orderFetching: true
            }
            break;
        case userConstant.GET_USER_ORDER_SUCCESS: 
            state = {
                ...state,
                orderFetching: false,
                orders: action.payload.orders
            }
            break;
        case userConstant.GET_USER_ORDER_FAILURE:
            state = {
                ...state,
                orderFetching: false,
                error: action.payload.error
            }
            break;
        case userConstant.GET_USER_ORDER_DETAILS_REQUEST:
            state = {
                ...state,
                orderFetching: true
            }
            break
        case userConstant.GET_USER_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                orderFetching: false,
                orderDetails: action.payload.order
            }
            break
        case userConstant.GET_USER_ORDER_DETAILS_FAILURE:
            state = {
                ...state,
                orderFetching: false,
                error: action.payload.error
            }
            break
    }
    return state
}