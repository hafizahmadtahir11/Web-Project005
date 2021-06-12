const mongoose = require("mongoose");
let userschema = mongoose.Schema({
    Name:String,
    Password:String,
    Email:String,
});

let User = mongoose.model("User",userschema);
module.exports=User;