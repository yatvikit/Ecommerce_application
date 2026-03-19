let cm=require("../models/cartmodel")
let {v4:uuidv4}=require("uuid")
let addcart=async(req,res)=>{
    try{
        
        let data=await cm.find({"uid":req.body.uid,"pid":req.body.pid})
        if(data.length==0)
        {
            let cdata=new cm({"_id":uuidv4(),...req.body,"qty":1})
            await cdata.save()
            res.json({"msg":"prod added to cart"})
        }
        else
        {
            await cm.findByIdAndUpdate(data[0]._id,{"$inc":{"qty":1}})
            res.json({"msg":"prod qty increased"})
        }
    }
    catch(err)
    {
        res.json({"msg":"error in adding to cart"})
    }
}
let getcart=async(req,res)=>{
    try{
        let data=await cm.find({"uid":req.params.uid})
        res.json(data)
    }
    catch(err)
    {
        res.json({"msg":"error in fetching cart"})
    }
}
let delcart=async(req,res)=>{
    try{
        await cm.findByIdAndDelete(req.params.id)   
        res.json({"msg":"prod removed from cart"})
    }
    catch(err)
    {
        res.json({"msg":"error in deleting from cart"})
    }   
}
let incqty=async(req,res)=>{
    try{
        await cm.findByIdAndUpdate(req.params.id,{"$inc":{"qty":1}})    
        res.json({"msg":"prod qty increased"})
    }
    catch(err)
    {
        res.json({"msg":"error in increasing qty"})
    }
}
let decqty=async(req,res)=>{
    try{    
         await cm.findByIdAndUpdate(req.params.id,{"$inc":{"qty":-1}})
        res.json({"msg":"prod qty decreased"})
    }
    catch(err)
    {
        res.json({"msg":"error in decreasing qty"})
    }
}
module.exports={addcart,getcart,delcart,incqty,decqty}
