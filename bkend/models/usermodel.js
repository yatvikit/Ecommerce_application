let mongoose=require("mongoose")
let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "phno":String,
    "pwd":String,
    "otp":String,
    "role":{
        type:String,
        default:"user"
    }

})
let um=new mongoose.model("um",usersch)
module.exports=um