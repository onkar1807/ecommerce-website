const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const { validationResult } = require('express-validator')


const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET, {
      expiresIn: "1d",
    });
  };

//------------- SIGNUP USER -----------//
exports.userSignup =  (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email: req.body.email})
    .exec(async (error, user) => {
        if(user) {
            return res.status(400).json({
                message: "User is already registered"
            });
        }

        const {
            firstName,
            lastName,
            email,
            password,
            username,
        } = req.body

        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password, salt);

        const _user = new User({
            firstName,
            lastName,
            email, 
            password: hash_password,
            username: `${username}-${shortid.generate()}`
        });

        _user.save((error, user_data) => {
            if(error) {
                return res.status(400).json({
                    message: "Something went wrong"
                });
            }

            if(user_data) {
                const token = generateJwtToken(user_data._id, user_data.role);
                const { _id, firstName, lastName, email, role, fullName } = user_data;
                return res.status(201).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                });
            }
        });
    });
}

//---------- SIGNIN USER ---------// 
exports.userSignin = (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const { email, password } = req.body;

    User.findOne({email}, async(err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "user email doesn't exist"
            })
        }

        // const validPassword = await user.authenticate(req.body.password);
        if(user && user.role === 'user') {
    
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRETE, {expiresIn: '1d'});

            const { _id, firstName, lastName, email, role, fullName } = user;
            res.status(200).json({
                token,
                user: { _id, firstName, lastName, email, role, fullName }
            });

        } else {
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
    })
}


//------------- SIGNOUT USER -----------//
exports.userSignout = (req, res) => {
    try {
     res.clearCookie('token');
     res.status(200).json({
         message: 'user Signed out successfully...!'
     })
    } catch (error) {
        console.log(error);
    }
 }

