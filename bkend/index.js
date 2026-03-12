let mongoose=require("mongoose")
let express=require("express")
let cors=require("cors")
const rt = require("./routes/rt")
mongoose.connect("mongodb+srv://irsr560:irsr560@cluster0.a8frh.mongodb.net/?appName=Cluster0").then(()=>{
    console.log("con ok")
}).catch(()=>{
    console.log("error in db con")
})

let app=express()
app.listen(5000)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({"extended":true}))
app.use("/",rt)