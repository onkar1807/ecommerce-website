const Product = require('../models/product');
const Category = require('../models/category');
const shortid = require('shortid');
const slugify = require('slugify');

//---------- CREATE PRODUCT----------- //
exports.createProduct = (req, res) => {
   const {
       name, slug, price, quantity, description, category, createdBy
    } = req.body;

    let productPictures = [];

    if(req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img : file.filename };
        })
    }

    const product = new Product({
        name,
        slug: slugify(name),
        price, 
        quantity,
        description, 
        productPictures, 
        category, 
        createdBy: req.user._id
    })

    product.save((error, product) => {
        if(error) {
            return res.status(400).json({
                message: "Failed to create product"
            })
        }
        res.status(200).json(product);
    })
}

//----------- GET PRODUCT BY SLUG -----------// 
exports.getProductBySlug = (req, res) => {
    
    let { slug } = req.params;
    Category.findOne({slug})
    .select('_id type')
    .exec((err, category) => {
        if(err) {
            return res.status(400).json(error)
        }
        Product.find({ category })
        .exec((err, products) => {
            res.status(200).json({
                products,
                productsByPrice: {
                    under10k: products.filter(product => product.price <= 10000),
                    under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                    under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                    under25k: products.filter(product => product.price > 20000 && product.price <= 25000)
                }
            });
        })
    })
   
}

//----------- GET PRODUCT BY ID -----------// 
exports.getProductById = (req, res) => {
    const { productId } = req.params;
    if(productId) {
        Product.findOne({ _id: productId })
        .exec((err, product) => {
            if(err) return res.status(400).json(err);
            if(product) {
                res.status(200).json({ product })
            }
        })
    } else {
        res.status(400).json({ error: 'Params required' })
    }
   
}

//----------- DELETE PRODUCT BY ID -----------// 
exports.deleteProductById = (req, res) => {
   const { productId } = req.body;
   if(productId) {
       Product.deleteOne({ _id: productId })
       .exec((err, result) => {
            if(err) return res.status(400).json(err);
            if(result) {
                res.status(200).json({ result })
            }
       })
   }
}

// ---------------- GET PRODUCTS CREATED BY PRODUCT -----------------// 
exports.getProducts = async (req, res) => {
    const products = await Product.find({ createdBy: req.user._id })
        .select("_id name price quantity slug description productPictures category")
        .populate({ path: 'category', select: '_id name'})
        .exec()
        res.status(200).json({ products })
}



// GET_ALL_PRODUCT_REQUEST: 'GET_ALL_PRODUCT_REQUEST',
// GET_ALL_PRODUCT_SUCCESS: 'GET_ALL_PRODUCT_SUCCESS',
// GET_ALL_PRODUCT_FAILURE: 'GET_ALL_PRODUCT_FAILURE',
// export const getProducts = () => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: productConstant.GET_ALL_PRODUCT_REQUEST })

//             const res = await axios.post('/product/getProducts')
//             if(res.status === 200) {
//                const { products } = res.data;
//                dispatch({
//                    type: productConstant.GET_ALL_PRODUCT_SUCCESS,
//                    payload: { products }
//                })
//             } else {
//                 dispatch({
//                     type: productConstant.GET_ALL_PRODUCT_FAILURE,
//                     payload: { error: res.data.error }
//                 })
//             }
//         } catch (error) {
            
//         }
//     }
// }




