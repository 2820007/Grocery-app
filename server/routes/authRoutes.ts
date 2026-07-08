
import  express  from "express"
import { login, register } from "../controller/authController.js"
const authRoute=express.Router()

authRoute.get("/test", (req, res) => {
  res.send("Auth route works");
});

authRoute.post('/register',register)
console.log("auth")
authRoute.post('/login',login)

export default authRoute