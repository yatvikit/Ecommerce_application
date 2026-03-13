let express=require("express")
const { reg, login, sendotp, resetpwd } = require("../controllers/usercont")
let rt=new express.Router()
rt.post("/reg",reg)
rt.post("/login",login)
rt.get("/sendotp/:id",sendotp)
rt.post("/resetpwd",resetpwd)
module.exports=rt