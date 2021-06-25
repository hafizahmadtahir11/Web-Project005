const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

let userschema = mongoose.Schema({
    Name: String,
    Password: String,
    Email: String,
    role: {
        type: String,
        default: "user",
    },
});

let User = mongoose.model("User", userschema);
module.exports = User;

// //sign up
// function validateUser(data) {
//     const schema = Joi.object({
//         Name: Joi.string().email(3).min(3).max(15).required(),
//         Email: Joi.string().email(3).min(3).max(15).required(),
//         Password: Joi.string().min(0).max(10).required()
//     });
//     return schema.validate(data, {
//         abortEarly: false
//     });
// }

// //login 
// function validateUserLogin(data) {
//     const schema = Joi.object({
//         Email: Joi.string().email(3).min(3).max(15).required(),
//         Password: Joi.string().min(0).max(10).required()
//     });

//     return schema.validate(data, {
//         abortEarly: false
//     });
// }

// module.exports.User = User;
// module.exports.validate = validateUser; // for sign up
// module.exports.validateUserLogin = validateUserLogin; // for log in