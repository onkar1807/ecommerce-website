import { categoryConstant } from '../actions/constant'

const initialState = {
    loading: false,
    categories: [],
    error: null
}

// const buildNewCategory = (parentId, categories, category) => {

// }

export const categoryReducers = (state = initialState, action) => {
    switch(action.type) {
        case categoryConstant.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;    
        case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false
            }
            break;    
       
    }
    return state
}