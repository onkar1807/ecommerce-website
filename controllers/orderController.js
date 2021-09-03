const Order = require('../models/order');
const Cart = require('../models/cart');
const Address = require('../models/address');

//------------- ADD ORDER ------------//
exports.addOrder = (req, res) => {
    Cart.findOneAndDelete({ user: req.user._id })
    .exec((err, result) => {
        if(err) return res.status(400).json({err});
        if(result) {
            req.body.user = req.user._id;
            req.body.orderStatus = [
                {
                    type: 'ordered',
                    date: new Date(),
                    isCompleted: true
                },
                {
                    type: 'packed',
                    isCompleted: false
                },
                {
                    type: 'shipped',
                    isCompleted: false
                },
                {
                    type: 'delivered',
                    isCompleted: false
                },
            ]
            const order = new Order(req.body);
            order.save((err, orders) => {
                if(err) return res.status(400).json({err});
                if(order) {
                    res.status(200).json({ orders });
                }
            })
        }
    })
}

//------------ GET ORDERS ----------//
exports.getOrders = (req, res)  => {
    Order.find({ user: req.user._id})
        .select('_id paymentStatus items')
        .populate('items.productId', '_id name productPictures')
        .exec((err, orders) => {
            if(err) return res.status(400).json({err});
            if(orders) {
            res.status(200).json({ orders });
        }
    })
}

//------------ GET ORDER ----------//
exports.getOrder = (req, res) => {
    Order.findOne({ _id: req.body.orderId })
      .populate("items.productId", "_id name productPictures")
      .lean()
      .exec((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          Address.findOne({
            user: req.user._id,
          }).exec((error, address) => {
            if (error) return res.status(400).json({ error });
            order.address = address.address.find(
              (adr) => adr._id.toString() == order.addressId.toString()
            );
            res.status(200).json({
              order,
            });
          });
        }
      });
  };