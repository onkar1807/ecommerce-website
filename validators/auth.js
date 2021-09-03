const {check} = require('express-validator');
exports.validateSignup = [
    check('firstName')
    .notEmpty()
    .withMessage('firstname is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastname is required'),
    check('email')
    .isEmail()
    .withMessage('valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 character long'),
]

exports.validateSignin = [
    check('email')
    .isEmail()
    .withMessage('valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 character long')
]
