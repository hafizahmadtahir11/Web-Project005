const mongoose = require("mongoose");
let productschema = mongoose.Schema({
    Name:String,
    Price:Number,
    image:String,
    Description:String,
    Status:String,
});

let Product = mongoose.model("products",productschema);
module.exports=Product;