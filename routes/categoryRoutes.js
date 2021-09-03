const express = require('express');
const router = express.Router();
const { isSignedIn, isAdmin } = require('../common_middlewares/index')
const { createCategory,
        getCategeries,
        updateCategory,
        deleteCategories } = require('../controllers/categoryController');



// saving pictures into DB
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function(req, file, cb){
        cb(null,  shortid.generate() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

// create category
router.post('/category/create', 
    isSignedIn, 
    isAdmin, 
    upload.single('categoryImage'),
    createCategory
);

// get categories
router.get('/category', getCategeries);

// update category
router.post('/category/update', 
    isSignedIn, 
    isAdmin,
    upload.array('categoryImage'),
    updateCategory 
)

// delete category
router.post('/category/delete', 
    isSignedIn, 
    isAdmin,
    deleteCategories
)



module.exports = router;