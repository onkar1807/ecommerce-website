import { productConstant } from "../actions/constant";

const initialState = {
    products: [],
    productsByPrice: {
        under10k: [],
        under15k: [],
        under20k: [],
        under25k: [],
    },
    pageRequest: false,
    page: {},
    error: null,
    productDetails: {}
}

export const productReducers = (state = initialState, action) => {
    switch(action.type) {
        case productConstant.GET_PRODUCT_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
        case productConstant.GET_PRODUCT_BY_SLUG_FAILURE:
            state = {
                initialState
            }
            break;
        case productConstant.GET_PRODUCT_BY_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest: true
            }
            break;
        case productConstant.GET_PRODUCT_BY_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageRequest: false
            }
            break;
        case productConstant.GET_PRODUCT_BY_PAGE_FAILURE:
            state = {
                ...state,
                pageRequest: false,
                error: action.payload.error
            }
            break;
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                productDetails: action.payload.productDetails,
                loading: false
            }
            break;
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}