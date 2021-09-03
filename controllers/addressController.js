const UserAddress = require('../models/address');
const address = require('../models/address');

exports.addAddress = (req, res) => {

    const { payload } = req.body;
    // console.log(payload);
    if(payload.address) {
        if(payload.address._id) {
            UserAddress.findOneAndUpdate(
                { 'user': req.user._id, 'address._id': payload.address._id },
                {
                    $set: {
                        'address.$': payload.address
                    }
                }
            ).exec((err, address) => {
                console.log(err)
                if(err) return res.status(400).json({ err });
                if(address) {
                    res.status(200).json({ address }); 
                }
            })
        } else {
            UserAddress.findOneAndUpdate({ 'user': req.user._id }, {
                $push: {
                    "address": payload.address
                }
            }, { new: true, upsert: true })
            .exec((err, address) => {
                if(err) return res.status(400).json({ err });
                if(address) {
                    res.status(200).json({ address }); 
                }
            })
        }
    } else {
        return res.status(400).json({ error: 'Params address required' });
    }
}


exports.getAddress = (req, res) => {
    UserAddress.findOne({ user: req.user._id })
    .exec((err, userAddress) => {
        if(err) return res.status(400).json({ err });
        if(userAddress) {
            res.status(200).json({ userAddress }); 
        }
    })
}