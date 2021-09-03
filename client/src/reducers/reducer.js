import { combineReducers } from 'redux'
import { authReducer } from './authReducers';
import { cartReducer } from './cartReducer';
import { categoryReducers } from './categoryReducers';
import { productReducers } from './productReducers';
import { userReducers } from './userReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducers,
    product: productReducers,
    cart: cartReducer,
    user: userReducers 
   
})

export default rootReducer;