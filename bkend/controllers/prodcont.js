let multer=require("multer")
const pm = require("../models/prodmodel")
let {v4}=require("uuid")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './prod')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
  }
})

const upload = multer({ storage: storage })

let addprod=async(req,res)=>{
    try{
        let data=new pm({...req.body,"img":req.file.filename,"_id":v4()})
        await data.save()
        res.json({"msg":"prod is added"})


    }
    catch
    {
        
        res.json({"msg":"error in adding prod"})
    }
}

let prods=async(req,res)=>{
    try{
        let data=await pm.find()
        res.json(data)

    }
    catch
    {
        res.json({"msg":"error in fetching prod"})
    }
}
module.exports={addprod,prods,upload}