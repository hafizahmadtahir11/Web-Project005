const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
let productschema = mongoose.Schema({

    Name: String,
    Price: Number,
    image: String,
    
});

let Product = mongoose.model("products", productschema);
module.exports = Product;

