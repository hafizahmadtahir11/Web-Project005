const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

let customersschema = mongoose.Schema({
    Name: String,
    Contact: String,
    Address: String,
    Card_Number: String,
    Expiry: String,
    Security_Code: String
});

let Customer = mongoose.model("Customer", customersschema);
module.exports = Customer;


//login 
function validateCustomerLogin(data) {
    const schema = Joi.object({

        Name: Joi.string().min(0).max(20).required(),
        Contact: Joi.string().min(0).max(15).required(),
        Address: Joi.string().min(0).max(100).required(),
        Card_Number: Joi.string().min(0).max(16).required(),
        Expiry: Joi.string().min(0).max(10).required(),
        Security_Code: Joi.string().min(0).max(5).required(),
    });

    return schema.validate(data, {
        abortEarly: false
    });
}

module.exports.validateCustomerLogin = validateCustomerLogin; // for log in