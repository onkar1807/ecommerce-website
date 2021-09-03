const express = require('express');
const { addAddress, getAddress } = require('../controllers/addressController');
const { isSignedIn, isUser } = require('../common_middlewares/index')
const router = express.Router();

// create user address
router.post('/user/address/create', isSignedIn, isUser, addAddress);

// get user address
router.get('/user/getaddress', isSignedIn, isUser, getAddress);

module.exports = router;