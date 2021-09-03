import axios from '../helper/axios'
import { categoryConstant } from './constant'

export const getAllCategoryAction = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST });

        const res = await axios.get(`/category`);
        
        if(res.status === 200) {
            const {categoryList} = res.data;
            
            dispatch({ 
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload:{ categories: categoryList } 
            })
        } else {
            dispatch({ 
                type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
                payload:{ error: res.data.error } 
            })
        }
    
    }
}

