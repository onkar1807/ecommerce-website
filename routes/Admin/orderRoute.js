const express = require('express');
const { isAdmin, isSignedIn } = require('../../common_middlewares');
const { updateOrder, getCustomerOrder } = require('../../controllers/Admin/order');
const router = express.Router();

// update user order
router.post('/order/update', isSignedIn, isAdmin, updateOrder);

// get user order
router.get('/order/getCustomerOrder', isSignedIn, isAdmin, getCustomerOrder);

module.exports = router;