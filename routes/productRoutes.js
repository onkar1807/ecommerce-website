const express = require('express');
const router = express.Router();
const { isSignedIn, isAdmin, isUser } = require('../common_middlewares/index')


// saving pictures into DB
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { getProductById, 
    createProduct, 
    getProductBySlug, 
    deleteProductById, 
    getProducts } = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function(req, file, cb){
        cb(null,  shortid.generate() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

// create product
router.post('/product/create', 
    isSignedIn, 
    isAdmin, 
    upload.array('productPictures'), 
    createProduct 
);

// get products by slug
router.get('/products/:slug', getProductBySlug);

// get product by Id
router.get('/product/:productId', getProductById);

// delete product by Id
router.delete('/produt/deleteProductById',
isSignedIn, 
isAdmin, 
deleteProductById);


router.post('/product/getProducts', 
isSignedIn, 
isAdmin,
getProducts);



module.exports = router;