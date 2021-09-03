// import axios from '../helper/axios';
// import { 
//     initialData, 
//     categoryConstant,  
//     productConstant 
//     } from './constant'

// export const getinitialData = () => {
//     return async (dispatch) => {
       
//         const res = await axios.post('/initialdata');
//         const { categories, products } = res.data;

//         if(res.status === 200) {
//             dispatch({
//                 type: categoryConstant.ADD_CATEGORY_SUCCESS,
//                 payload: { categories }
//             })
//             dispatch({
//                 type:  productConstant.GET_ALL_PRODUCT_SUCCESS,
//                 payload: { products }
//             })
//         }
//     }
// }