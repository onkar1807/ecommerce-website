const Category = require('../models/category');
const slugify = require('slugify');

//---------- CREATE CATEGORY ---------// 
exports.createCategory = (req, res) => {
    const { name, slug, parentId, type } = req.body;

    const categoryObj = {
        name,
        slug: slugify(name)
    }

    if(req.file) {
        categoryObj.categoryImage = '/public/' + req.file.filename;
    }

    if(parentId) {
        categoryObj.parentId = parentId
    }

    if(type) {
        categoryObj.type = type 
    }

    const newCategory = new Category(categoryObj);
    newCategory.save((error, category) => {
        if(error) {
            return res.status(400).json({
                message: 'Failed to create category'
            })
        }
        res.status(200).json({category});
    })
}



const createCategories = (categories, parentId = null) => {

    const categoryList = [];
    let category;

    if(parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            // categoryImage: cate.categoryImage,
            children: createCategories(categories, cate._id) 
        })
        
    }

    return categoryList;
}

//---------- GET CATEGORIES--------- // 
exports.getCategeries = (req, res) => {

    Category.find({})
    .exec((error, categories) => {
        if(error) {
            return res.status(400).json(error);
        }
        const categoryList = createCategories(categories);
        res.status(200).json({categoryList});
    })
}

//---------- UPDATING CATEGORY--------- // 
exports.updateCategory = async(req, res) => {
    
    const { _id, name, parentId, type } = req.body;
    let updatedCategories = []

    if(name instanceof Array) {
        for(let i = 0; i < name.length; i++) {
            const newCategory = {
                name: name[i],
                type: type[i]
            }

            if(parentId[i] !== '') {
                newCategory.parentId = parentId[i]
            }
            const updatedCategory = await Category.findOneAndUpdate(
                { _id: _id[i] }, newCategory, { new: true }
            );
            updatedCategories.push(updatedCategory)
        }
       
        return res.status(201).json({ updatedCategories:  updatedCategories })
    } else {
        const newCategory = {
            name: name,
            type: type
        }

        if(parentId !== '') {
            newCategory.parentId = parentId
        }

        const updatedCategory = await Category.findOneAndUpdate(
            { _id }, newCategory, { new: true }
        );
        return res.status(201).json({ updatedCategory })

    }
}

//----------- DELETING CATEGORY--------- // 
exports.deleteCategories = async (req, res) => {

    const { Ids } = req.body.payload;
    const deletedCategories = [];
    for(let i = 0; i < Ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({_id: Ids[i]._id});
        deletedCategories.push(deleteCategory);
    }
    res.status(200).json({
        message: 'Categories removed'
    });
}

