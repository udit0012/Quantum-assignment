import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const mongo = async()=>{
    try {
        mongoose.connect(String(process.env.MONGO_URL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then(()=>{console.log("Connected successfully");})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

export default mongo