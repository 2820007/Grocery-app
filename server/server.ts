import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import productRouter from "./routes/productRoute.js";
import uploadRouter from "./routes/uplodadRoute.js";
import orderRouter from "./routes/orderRoutes.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import addressRouter from "./routes/addressRoutes.js";
import adminRouter from "./routes/adminRoute.js";
import deliveryPartnerRouter from "./routes/deliveryPartnerRoute.js";




const app = express();


// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("SERVER CHANGED 12345");
});
app.get("/api/admin/test", (req:Request, res:Response) => {
  res.send("This is admin test api");
});





//auth route
app.use("/api/auth",authRoute)

//product route

app.use("/api/products",productRouter)
app.use("/api/upload",uploadRouter)
//Order
app.use("/api/orders",orderRouter)

//inngest

app.use("/api/inngest", serve({ client: inngest, functions }));

//Address
app.use("/api/addresses",addressRouter)



//Admin

app.use("/api/admin",adminRouter)
//Delivery
app.use("/api/delivery",deliveryPartnerRouter)

// Error handling
app.use((error:any, req:Request,res:Response,next:NextFunction)=>{
    console.error(error)
    res.status(500).json({message:error.message})

})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});