const Page = require('../models/page');

//------------------- CREATE PAGE --------------------// 
exports.createPage = (req, res) => {

    const { banners, products } = req.files;

    if(banners.length > 0) {
        req.body.banners = banners.map((banner, idx) => ({
            img: `/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`
        }))
    }

    if(products.length > 0) {
        req.body.products = products.map((product, idx) => ({
            img: `/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`
        }))
    }

    req.body.createdBy = req.user._id;

    Page.findOne({ categoryId: req.body.categoryId })
    .exec((error, page) => {
        if(error) return res.status(400).json({ error })
        if(page) {
            Page.findOneAndUpdate({ categoryId: req.body.categoryId }, req.body)
            .exec((error, updatedPage) => {
                if(error) return res.status(400).json({ error })
                return res.status(200).json({ page: updatedPage })
            })

        } else {
            const newPage = new Page(req.body);
            newPage.save((error, page) => {
                if(error) {
                    return res.status(500).json(error)
                }
                return res.status(200).json({ page })
            })
        }
    })
}


//------------------- GET PAGE --------------------// 
exports.getPage = async (req, res) => {

    const { categoryId, type } = req.params;
    try {
        if(type === 'Page') {
            Page.findOne({ categoryId: categoryId })
            .exec((err, page) => {
                if(err)  return res.status(500).json(err);
                if(page) return res.status(200).json({ page });
            })
        }
    } catch (error) {
        console.log(error);
    }
    
}

