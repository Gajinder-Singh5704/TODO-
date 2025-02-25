import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

let user = process.env.EMAIL;
let pass = process.env.PASSWORD;
export const sendMail = async(email,link) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: pass,
        },
      });
    
      const receiver = {
        from : user,
        to : email ,
        subject : "TODO PASSWORD RESET",
        text : link
      };
    
      transporter.sendMail(receiver,(err,result)=>{
        if (err) throw err;
        console.log(result);
      })
}