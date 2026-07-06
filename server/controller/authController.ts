
import { Request, Response } from "express"
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";



// generate Jwt token
const generateToken=(id:string)=>{
    return jwt.sign({id},process.env.JWT_SECRET as string,{
        expiresIn:"30d"
    })
}
//check if user is admin

const getAdminStatus=(email:string | null |undefined):boolean=>{
    if(!email) return false
    const adminEmail=process.env.ADMIN_EMAIL ?  process.env.ADMIN_EMAIL.split(",").map((e)=>e.trim().toLowerCase()):[]
    return adminEmail.includes(email.toLowerCase())
}



// Resister
//Post/api/auth/register



export const register=async(req:Request,res:Response)=>{

    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message:"Please provide all fields"
        })
    }

    const existUser=await prisma.user.findUnique({where:{email:email.toLowerCase()}})

    if(existUser){
        return res.status(400).json({
            message:"User already exists with this email"
        })
    }

    const hashedPass=await bcrypt.hash(password,10)
    const user=await prisma.user.create({
        data:{name,email:email.toLowerCase(),password:hashedPass}
    })

    const token=generateToken(user.id)
    const userData:any={
        ...user
    };
    delete userData.password

    userData.isAdmin=getAdminStatus(userData.email)
    res.status(201).json({
        message:"User register successfully",
        user:userData,
        token
    })




}


// user login

export const login=async(req:Request,res:Response)=>{

    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"Please provide all fields"
        })
    }

    const user=await prisma.user.findUnique({where:{email:email.toLowerCase()},include:{addresses:true}})

    if(!user){
        return res.status(401).json({
            message:" Invalid credentials"
        })
    }



    const isMatched=await bcrypt.compare(password,user.password)

    if(!isMatched){
        return res.status(401).json({message:"Invalid credentials"})
    }



   

    const token=generateToken(user.id)
    const userData:any={
        ...user
    };
    delete userData.password

    userData.isAdmin=getAdminStatus(userData.email)
    res.status(201).json({
        message:"User login  successfully",
        user:userData,
        token
    })




}