import { connection } from "../DATABASE/sqlconnect.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const getLogin = (req,res) =>{
    console.log('getlogin')
    res.redirect('login.html')
}

export const postLogin = (req,res) =>{
    const { email, password } = req.body;
    console.log(email, password);

    let conn = connection();
    let query = "SELECT * FROM users WHERE email = ?";
    
    conn.query(query, [email], async (err, result) => {

        if (err) throw(err)

        if (result.length === 0) {
            res.json({ 
                success: false,
                message: "USER NOT FOUND"
            });
            // res.send("User not found");
        } else {
            let user = result[0];
            let passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (passwordMatch) {
                    let id = result[0].id;
                    const token = jwt.sign({ user_id: id }, SECRET_KEY, { expiresIn: "360m" });
                    res.cookie("token", token, {
                        httpOnly: true,   
                        secure: true,   
                        maxAge: 24 * 60 * 60 * 1000
                    });
                    res.json({ 
                        success: true,
                        message: "PASSWORD CORRECT"
                    });
                    // return res.redirect('/home')
                    // return res.json({ token });
            } else {
                res.json({ 
                    success: false,
                    message: "PASSWORD NOT CORRECT"
                });
                // res.send("Incorrect password");
            }
        }
    conn.end();
    });

};


export const check = (req,res)=>{
    res.send('checked');
}