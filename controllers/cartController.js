const Cart = require('../models/cart');


const runUpdate = (condition, updateData) => {
    return new Promise((resolve, reject) => {

        Cart.findOneAndUpdate(condition, updateData, { upsert: true })
        .then(result => resolve)
        .reject(err => reject(err))
    })
}


// ------------- ADD ITEM TO CART ------------// 
exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error) {
            return res.status(400).json(error)
        }

        if(cart) {
            // If cart is already exist then update it by increasing quantity
            let promiseArray = [];

            req.body.cartItems.forEach((cartItem) => {
                const product = cartItem.product;
                const item = cart.cartItems.find(c => c.product === product);
                let condition, update;

                if(item) {
                    condition = { 'user': req.user._id, "cartItems.product": product }
                    update = {
                        $set: {
                            "cartItems.$": cartItem
                        }
                    }
                } else {
                    condition = { 'user': req.user._id, }
                    update = {
                        $push: {
                            "cartItems": cartItem
                        }
                    }
                }
                promiseArray.push(runUpdate(condition, update));
            })

            Promise.all(promiseArray)
            .then(response => res.status(200).json({response}))
            .catch(error => console.log(error))
            // console.log(promiseArray)

        } else {
            // If not exixst then create one

            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems
            })
        
            cart.save((error, cart) => {
                if(error) {
                    // console.log(error)
                    return res.status(400).json({
                        message: "Failed to create cart"
                    })
                }
                res.status(200).json(cart);
            })
        }
    }) 
}

//------------- GET ITEM FROM CART ------------// 
exports.getCartItems = (req, res) => {
    Cart.findOne({ user: req.user._id })
    .populate('cartItems.product', '_id name price productPictures')
    .exec((err, cart) => {
        if(err) return res.status(400).json({ error });
        if(cart) {
            let cartItems = {}
            cart.cartItems.forEach((item, index) => {
                cartItems[item.product._id.toString()] = {
                    _id: item.product._id.toString(),
                    name: item.product.name,
                    img: item.product.productPictures[0].img,
                    price: item.product.price,
                    qty: item.quantity
                }
            })
            // console.log(cartItems);
            res.status(200).json({ cartItems })
        }
    })
}


//------------- REMOVE CART ITEMS ------------// 
exports.removeCartItem = (req, res) => {
    const { productId } = req.body.payload;

    if(productId) {
        Cart.updateOne({ user: req.user._id }, {
            $pull: {
                cartItems: {
                    product:  productId
                }
            }
        }).exec((err, result) => {
            if(err) return res.status(400).json(err)
            if(result) {
                res.status(200).json({ result })
            }
        })
    }
}






// exports.itemtoCart = (req, res) => {

//     Cart.findOne({ user: req.user._id })
//     .exec((err, cart) => {
//         if(err) return res.status(400).json({ err })
//         if(cart) {

//             const product = req.body.cartItems.product;
//             const item = cart.cartItems.find(c => c.product === product);

//             if(item) {
//                 Cart.findOneAndUpdate({  'user': req.user._id, 'cartItems.product': product }, {
//                     "$set": {
//                         "cartItems" : {
//                             ...req.body.cartItems,
//                             quantity: item.qty + req.body.cartItems.qty
//                         }
//                     }
//                 })
//             } else {
//                 Cart.findOneAndUpdate({ user: req.user._id }, {
//                     "$push": {
//                         "cartItems": req.body.cartItems
//                     }
//                 })
//                 .exec((err, _cart) => {
//                     if(err) return res.status(400).json({ err })
//                     if(_cart)  res.status(200).json({ _cart })
//                 })
//             }

//         } else {
//             const newCart = new Cart({
//                 user: req.user._id,
//                 cartItems: [req.body.cartItems]
//             })
        
//             newCart.save((err, cart) => {
//                 if(err) return res.status(400).json({ err })
//                 if(cart) {
//                     res.status(200).json({ cart })
//                 }
//             })
//         }
//     })
    
// }

