let mongoose=require("mongoose")
let express=require("express")
let cors=require("cors")
const rt = require("./routes/rt")
require("dotenv").config()
let app=express()
mongoose.connect(process.env.dburl).then(()=>{
    console.log("con ok")
    app.listen(process.env.port)
}).catch((err)=>{
    console.log(err)
})



app.use(cors())
app.use(express.json())
app.use("/prodimgs",express.static("./prod"))
app.use(express.urlencoded({"extended":true}))
app.use("/",rt)