import { authConstant, signupConstant } from "../actions/constant"

const initialState = {
    token: null,
    user: null,
    authenticate: false,
    authenticating: false,
    error: null,
    message: ''
}

export const authReducer = (state = initialState, action) => {
    
    switch(action.type){
        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload,
                token: action.payload,
                authenticate: true,
                authenticating: false
            }
            break;

        case authConstant.LOGOUT_SUCCESS: 
            state = {
                ...initialState,
                message: action.payload
            }
            break;
        case authConstant.LOGOUT_FAILED: 
            state = {
                ...state,
                error: action.payload
            }
            break;
        case signupConstant.SIGNUP_REQUEST:
            break;
        case signupConstant.SIGNUP_SUCCESS:
            break;
        case signupConstant.SIGNUP_FAILED:
            break;
    }
    return state
}