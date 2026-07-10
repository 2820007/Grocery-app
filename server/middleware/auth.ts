import { Response,Request,NextFunction } from "express";
import  jwt  from 'jsonwebtoken';

const auth=(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log("Auth middleware reached");

        const authHeader=req.headers.authorization;
        console.log("Authorization:", authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message:"No token provided , authorization denied."
            })
        }

        const token=authHeader.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as {id:string}

        req.user={id:decoded.id}
        console.log("Auth passed");
        next()

        
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Token is not valid"})
        
    }
}

export default auth