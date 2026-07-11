import { Request,Response } from "express"
import { prisma } from "../config/prisma.js"
import bcrypt  from 'bcrypt';

//get admin dashboard data

export const getAdminStats = async (req: Request, res: Response) => {
    console.log("Controller Hit");
    console.log("hi am in admin controller")
  try {
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      outOfStock,
      totalPartners,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count({
        where: {
          NOT: [{ paymentMethod: "card", isPaid: false }],
        },
      }),
      prisma.user.count(),
      prisma.product.count(),
      prisma.product.count({
        where: { stock: 0 },
      }),
      prisma.deliveryPartner.count(),
      prisma.order.findMany({
        where: {
          NOT: [{ paymentMethod: "card", isPaid: false }],
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 8,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          deliveryPartner: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
      }),
    ]);

    return res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      outOfStock,
      totalPartners,
      recentOrders,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    return res.status(500).json({
      message: "Failed to load dashboard stats",
      error,
    });
  }
};


//get delivery partner list for admin

export const getDeliveryPartner=async(req:Request,res:Response)=>{
    const partners=await prisma.deliveryPartner.findMany({
        orderBy:{createdAt:"desc"}
    })
    res.json({partners})
}

//new delivery partner profile

export const createDeliveryPartner=async(req:Request,res:Response)=>{
    const {name,email,password,phone,vehicleType}=req.body
    if(!name || !email || !phone ||!phone){
        res.status(400).json({message:"Please provide all required fields"})
        return
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const partner=await prisma.deliveryPartner.create({
        data:{name, email:email.toLowerCase(),password:hashedPassword,phone,vehicleType}
    })
    res.json({partner})
}

//update delivery partner

export const updateDeliveryPartner=async(req:Request,res:Response)=>{
    const {name,phone,vehicleType,isActive}=req.body

    const data:any={}
    if(name) data.name=name
    if(phone) data.phone=phone
    if(vehicleType) data.vehicleType=vehicleType
    data.isActive=isActive

    try {

        const partner=await prisma.deliveryPartner.update({
            where:{id:req.params.id as string},
            data
        })
        res.json({partner})
        
    } catch (error) {
        res.status(404).json({message:"Partner not found"})
        
    }

}


//assign delivery partner for order


export const assignDeliveryPartner=async(req:Request,res:Response)=>{

    const {partnerId}=req.body
    const order=await prisma.order.findUnique({
        where:{id:req.params.id as string}

    })

    const partner=await prisma.deliveryPartner.findUnique({
        where:{id:partnerId}
    })

    const otp=String(Math.floor(100000 +Math.random()*900000))
    let status=order!.status
    const history:any[]=Array.isArray(order!.statusHistory) ? order!.statusHistory:[]
    if(order!.status ==="Placed" || order!.status === "Confirmed"){
        status="Assigned"
        history.push({
            status:"Assigned",
            note:`Assigned to ${partner!.name}`,
            timeStamp:new Date()
        })
    }

    await prisma.order.update({
        where:{id:order!.id},
        data:{deliveryPartnerId:partner!.id, deliveryOtp:otp,status,statusHistory:history}
    })

    res.json({order})
    

}

