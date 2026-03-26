let multer=require("multer")
const pm = require("../models/prodmodel")
let {v4}=require("uuid")
let fs=require("fs")
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
let upddet=async(req,res)=>{
    try
    {
        await pm.findByIdAndUpdate({
            "_id":req.body._id
        },req.body)
        res.json({"msg":"det updated"})

    }
    catch
    {
        res.json({"msg":"error in updation"})
    }
}

let updimg=async(req,res)=>{
    try
    {
         
       let obj= await pm.findByIdAndUpdate({"_id":req.body._id},{"img":req.file.filename})
      
       fs.rm(`./prod/${obj.img}`,()=>{})
       res.json({"msg":"updating img done"})

    }
    catch(err)
    {
        console.log(err)
        res.json({"msg":"error in upd img"})
    }
}
let delprod=async(req,res)=>{
    try{
       let obj=await  pm.findByIdAndDelete(req.params.pid)
         fs.rm(`./prod/${obj.img}`,()=>{})
       res.json({"msg":"del done"})



    }
    catch
    {
res.json({"msg":"error in del"})
    }
}

let getprods=async(req,res)=>{
    try{
        let data=await pm.findById(req.params.pid)
        res.json(data)

    }
    catch
    {
        res.json({"msg":"error in fetching prod"})
    }
}
let addcomm=async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body.pid},{
            $push:{"comm":{"name":req.body.name,"comm":req.body.comm,"rating":req.body.rating}}
        })
        res.json({"msg":"comment added"})   
    }
    catch(err)
    {
        console.log(err)
        res.json({"msg":"error in adding comment"})
    }
}


module.exports={addprod,prods,upload,updimg,upddet,delprod,getprods,addcomm}