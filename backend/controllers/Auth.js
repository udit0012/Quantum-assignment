import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcyrpt from "bcrypt"
import {jsonData} from "../data.js"
const jwt_key = "secretKey"
export const login = async (req, res) => {

    try {
        const { email, password } = req.body
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ msg: "failed", data: null, error: "Invalid credentials" })
        }
        const passcompare = await bcyrpt.compare(password, user.password)
        if (!passcompare) {
            return res.status(400).json({ msg: "failed", data: null, error: "Invalid Credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_key)
        delete user.password
        return res.status(200).json({ msg: "success", data: { authtoken, user }, error: null })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Internal server error' })
    }
}
export const register = async (req, res) => {
    // console.log(req.body);
    try {
        let user = await User.findOne({ $or: [{ email: req.body.email }] })
        if (user) {
            return res.status(400).json({ msg: "failed", data: null, error: "User already exists" })
        }
        const salt = await bcyrpt.genSalt(10);
        const secpass = await bcyrpt.hash(req.body.password, salt)
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secpass,
            dob: req.body.dob
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_key)
        delete user.password
        return res.status(200).json({ msg: "success", data: { authtoken, user }, error: null })
    } catch (error) {
        res.status(400).json({ msg: "failed", data: null, error: 'Internal server error' })
        console.log(error);
    }
}
export const getData = async (req, res) => {

    try {
        return res.json({msg:"success",data:jsonData,error:null})
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "failed", data: null, error: 'Internal server error' })
    }
}