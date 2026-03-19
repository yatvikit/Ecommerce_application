let mongoose=require("mongoose")
let sch=new mongoose.Schema({
    "_id":String,
    "uid":String,
    "pid":String,
    "title":String,
    "price":Number,
    "qty":Number,
    "disc":Number,
    "img":String

})
let cm=mongoose.model("cm",sch)
module.exports=cm