let mongoose=require("mongoose")
let express=require("express")
let cors=require("cors")
const rt = require("./routes/rt")
mongoose.connect("mongodb://irsr560:irsr560@cluster0-shard-00-00.a8frh.mongodb.net:27017,cluster0-shard-00-01.a8frh.mongodb.net:27017,cluster0-shard-00-02.a8frh.mongodb.net:27017/?ssl=true&replicaSet=atlas-ggm407-shard-0&authSource=admin&appName=Cluster0").then(()=>{
    console.log("con ok")
}).catch((err)=>{
    console.log(err)
})

let app=express()
app.listen(5000)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({"extended":true}))
app.use("/",rt)