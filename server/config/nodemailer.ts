
import { createTransport } from "nodemailer";
// Create a transporter using SMTP
const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


const sendEmail=async({to,subject,body}:{to:string,subject:string,body:string})=>{
   const res= await transporter.sendMail({
        from:"dot123com456@gmail.com",
        to: process.env.SENDER_EMAIL,
        subject,
        html:body,
    })
    return res

}
export default sendEmail