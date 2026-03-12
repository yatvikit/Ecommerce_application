let express=require("express")
const { reg, login } = require("../controllers/usercont")
let rt=new express.Router()
rt.post("/reg",reg)
rt.post("/login",login)

module.exports=rt