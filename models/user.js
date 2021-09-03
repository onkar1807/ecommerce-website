const mongoose = require('mongoose');
const crypto = require("crypto");
const {v4: uuidv4} = require("uuid");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 25
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
}, 
    { timestamps: true }
)

// userSchema.virtual("password")
//   .set(function(password) {
//     this._password = password;
//     this.salt = uuidv4();
//     this.encry_password = this.securePassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

userSchema.virtual('fullName')
  .get(function(){
  return `${this.firstName} ${this.lastName}`;
})

// userSchema.methods = {
//   authenticate: async function(password) {
//     return await bcrypt.comapare(password, this.hash_password)
//     },
// }

//   securePassword: function(password) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   }
// };

module.exports = mongoose.model('User', userSchema);