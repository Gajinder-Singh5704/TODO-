import { connection } from "../DATABASE/sqlconnect.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const getReset = (req,res) =>{
    res.redirect('reset.html');
}


export const changePass = (req,res) =>{
    const { email } = req.body;
    console.log(email);

    let conn = connection();
    let query = "SELECT email FROM users WHERE email = ?";
    
    conn.query(query, [email], async (err, result) => {

        if (err) throw(err)

        if (result.length === 0) {
            res.send("User not found");
        } else {

            // res.send("User found");
            const email = (result[0].email);
            const secret = SECRET_KEY + email;
            const token = jwt.sign({ email: email }, secret, { expiresIn: "15m" });
            const link = `http://localhost:3000/${email}/${token}`;
            console.log(link);
            res.send('RESET LINK HAS BEEN SENT TO THE USER EMAIL');
        }
    conn.end();
    });
    // res.redirect('changePass.html');
}


export const getChangePass = (req,res) =>{
    const { email,token } = req.params;
    console.log('email& token :',email,token);
    const secret = SECRET_KEY + email;
    // res.send('ok report');
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.send('token expired')
        }
        else{
            console.log("running");
            const user_info = {
                email:email,
                token:token
            }
            res.cookie("reset", user_info, {
                httpOnly: true,   
                secure: true,   
                maxAge: 15 * 60 * 1000
            });
            res.redirect('/changePass.html')
        }
    });
}


export const  postChangePass = (req,res) =>{
    const user_info = req.cookies.reset;
    const token = user_info.token;
    const email = user_info.email;
    const secret = SECRET_KEY + email;
    const {password} = req.body;
    console.log(password);
    jwt.verify(token, secret, async(err, decoded) => {
        if (err) {
            return res.send('token expired')
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword)
            const con = connection();
            const query = `UPDATE users SET password_hash =? where email = ?`
            con.query(query,[hashedPassword,email],(err,result)=>{
                if (err) throw err;
                console.log(result);
            })
            res.redirect('/')
        }
    })
}