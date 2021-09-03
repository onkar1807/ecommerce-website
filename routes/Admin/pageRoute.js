const express = require('express');
const router = express.Router();
const { isSignedIn, isAdmin, upload } = require('../../common_middlewares/index')
const { createPage, getPage } = require('../../controllers/pageController');


router.post('/page/create', isSignedIn, isAdmin, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]) 
, createPage);

router.get('/page/:categoryId/:type', getPage);

module.exports = router;
