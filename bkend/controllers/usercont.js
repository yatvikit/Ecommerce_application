const um = require("../models/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const nodemailer = require("nodemailer");
const cm = require("../models/cartmodel");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: "irsr560@gmail.com",
    pass: process.env.apppwd,
  },
    tls: {
      rejectUnauthorized: false
    }
});
let reg=async(req,res)=>{
    try{
       
        let obj=await um.findById(req.body._id)
         
        if(obj)
        {
            res.json({"msg":"with given email acc exists"})
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
                let x=await cm.find({"uid":obj._id})
                res.json({"token":jwt.sign({"_id":obj._id},process.env.pk),"role":obj.role,"name":obj.name,"uid":obj._id,"cartlength":x.length})
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

let sendotp=async(req,res)=>{
    try
    {
        let obj=await um.findById(req.params.id)
        if(obj)

 {
                 let otp=Math.round(Math.random()*1e6)
        otp=""+otp
        otp=otp.padEnd(6,0)
        await um.findByIdAndUpdate({"_id":obj._id},{"otp":otp})

        const info = await transporter.sendMail({
    from: '"irsr" <irsr560@gmail.com>',
    to:obj._id ,
    subject: "otp to reset pwd",
    text: `otp to reset pwd is ${otp}`, // Plain-text version of the message
    
  });
  if(info.accepted.length>0)
  {
    res.json({"msg":"otp sent"})
  }
  else{
 res.json({"msg":"error in sneding otp re-try"})
  }




}
else{
    res.json({"msg":"check email"})
}

       
    }
    catch(err)
    {
         console.log(err)
      res.json({"msg":"error in sending otp"})  
    }
}

let resetpwd=async(req,res)=>{
    try{
        let obj=await um.findById(req.body._id)
        if(req.body.otp==obj.otp)
        {
            let pwdhash=await bcrypt.hash(req.body.pwd,10)
            await um.findByIdAndUpdate({"_id":obj._id},{"pwd":pwdhash,"otp":""})
            res.json({"msg":"pwd rest done"})

        }
        else{
            res.json({"msg":"invalid otp"})
        }


    }
    catch
    {
        res.json({"msg":"error in pwd reset"})
    }
}

module.exports={reg,login,sendotp,resetpwd}