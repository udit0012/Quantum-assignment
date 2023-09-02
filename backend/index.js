import express from "express"
import authentication from "./routes/Auth.js"
import cors from "cors"
import mongo from "./models/db.js"
const app = express()

app.use(cors())
app.use(express.json())

mongo();

app.use("/api",authentication)

app.listen(8000,()=>{
    console.log("App is running");
})