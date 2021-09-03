const express = require('express');
const { validateSignup, validateSignin } = require('../../validators/auth');
const { isSignedIn } = require('../../common_middlewares/index');
const router = express.Router();
const { userSignup,
        userSignin,
        userSignout } = require('../../controllers/Admin/adminController');

// signup admin
router.post('/admin/signup', validateSignup, userSignup);

// signin admin
router.post('/admin/signin', validateSignin, userSignin);

// signout admin
router.post('/admin/signout', isSignedIn, userSignout);

module.exports = router;