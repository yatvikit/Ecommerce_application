const um = require("../models/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
let reg=async(req,res)=>{
    try{
        let obj=await um.findById(req.body._id)
        if(obj)
        {
            reg.json({"msg":"with given email acc exists"})
        }
        else{
            let pwdhash=await bcrypt.hash(req.body.pwd,10)
            let data=new um({...req.body,"pwd":pwdhash})
            await data.save()
            res.json({"msg":"acc created"})
        }

    }
    catch
    {
        res.json({"msg":"error in reg"})
    }


}

let login=async(req,res)=>{
    try{
        let obj=await um.findById(req.body._id)
        if(obj)
        {
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f)
            {
                res.json({"token":jwt.sign({"_id":obj._id},"1234"),"role":obj.role,"name":obj.name,"uid":obj._id})
            }
            else{
                res.json({"msg":"check pwd"})
            }

        }
        else{
            res.json({"msg":"check email"})
        }


    }
    catch{
        res.json({"msg":"error in login"})
    }
}

module.exports={reg,login}