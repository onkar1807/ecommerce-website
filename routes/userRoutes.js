const express = require('express');
const router = express.Router();
const { validateSignup, validateSignin } = require('../validators/auth');
const { userSignup,
        userSignin, 
        userSignout } = require('../controllers/authController');

// user signup
router.post('/signup', validateSignup, userSignup);

// user signin
router.post('/signin', validateSignin, userSignin);

// user signout
router.post('/signout', userSignout);


module.exports = router;