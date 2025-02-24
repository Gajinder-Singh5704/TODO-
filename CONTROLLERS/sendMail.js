import nodemailer from "nodemailer";

export const sendMail = async(email,link) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "thakur.som1998@gmail.com",
          pass: "fixgouztznvinscj",
        },
      });
    
      const receiver = {
        from :  "thakur.som1998@gmail.com",
        to : email ,
        subject : "TODO PASSWORD RESET",
        text : link
      };
    
      transporter.sendMail(receiver,(err,result)=>{
        if (err) throw err;
        console.log(result);
      })
}