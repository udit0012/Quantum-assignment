import express from "express"
import { getData, login, register } from "../controllers/Auth.js"
const router = express.Router()

router.post("/login",login)
router.post("/register",register)
router.get("/getData",getData)

export default router