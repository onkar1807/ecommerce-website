const Order = require('../../models/order');

//------------ UPDATE CUSTOMER ORDER ----------------// 
exports.updateOrder = (req, res) => {
    Order.updateOne(
        { _id: req.body.orderId, 'orderStatus.type': req.body.type },
        {
            $set: {
                "orderStatus.$": [
                    { type: req.body.type, date: new Date, isCompleted: true }
                ]
            }
        }
    ).exec((err, orders) => {
        if(err) return res.status(400).json(err);
        if(orders) {
            res.status(200).json({ orders })
        }
    })
}


//------------ GET CUSTOMER ORDER ----------------// 
exports.getCustomerOrder = async (req, res) => {
    const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec()
    res.status(200).json({ orders })
}