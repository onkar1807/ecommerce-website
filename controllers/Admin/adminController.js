const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const {validationResult} = require('express-validator')

//------------- SIGNUP ADMIN -----------//
exports.userSignup = (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) {
                return res.status(400).json({
                    message: "Admin is already registered"
                });
            }

            const {
                firstName,
                lastName,
                email,
                password,
            } = req.body

            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(password, salt);

            const _user = new User({
                firstName,
                lastName,
                email,
                password: hash_password,
                username: shortid.generate(),
                role: 'admin'
            });

            _user.save((error, user_data) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong"
                    });
                }

                res.status(200).json({
                    message: "Admin signed up successfully"
                });
            });

        });
}

//---------- SIGNIN ADMIN ---------// 
exports.userSignin = (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const { email, password } = req.body;

    User.findOne({ email }, async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Admin email doesn't exist"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword && user.role === 'admin') {
            
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRETE, { expiresIn: '1d' });

            const { _id, firstName, lastName, email, role, fullName } = user;
            res.cookie('token', token, { expiresIn: '1d' });

            res.status(200).json({
                token,
                message: "Admin successfully signedin",
                user: { _id, firstName, lastName, email, role, fullName }
            });

        } else {
            return res.status(400).json({
                error: "Invalid password"
            })
        }


    })
}

//------------- SIGNOUT ADMIN -----------//
exports.userSignout = (req, res) => {
   try {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Admin Signed out successfully...!'
    })
   } catch (error) {
       console.log(error);
   }
}


