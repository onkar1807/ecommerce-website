const express = require('express');
const router = express.Router();
const { isSignedIn,  isUser } = require('../common_middlewares/index')
const { addItemToCart, getCartItems, removeCartItem } = require('../controllers/cartController');

// add to cart
router.post('/user/cart/add-to-cart', isSignedIn, isUser, addItemToCart);

// get from cart
router.get('/user/getCartItems', isSignedIn, isUser, getCartItems);

// remove cart item
router.post('/user/cart/removeItem', isSignedIn, isUser, removeCartItem);

module.exports = router;