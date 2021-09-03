const express = require('express');
const { addOrder, getOrders, getOrder } = require('../controllers/orderController');
const { isSignedIn, isUser } = require('../common_middlewares/index')
const router = express.Router();

// create user order
router.post('/addOrder', isSignedIn, isUser, addOrder);

// get user orders
router.get('/getOrders', isSignedIn, isUser, getOrders);

// get user order
router.post('/getOrder', isSignedIn, isUser, getOrder);

module.exports = router;