let mongoose=require("mongoose")
let prodsch=new mongoose.Schema({
    "_id":String,
    "title":String,
    "desc":String,
    "cat":String,
    "price":String,
    "disc":Number,
    "img":String,
    "comm":[]
})
let pm=mongoose.model("pm",prodsch)
module.exports=pm