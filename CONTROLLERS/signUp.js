import { connection } from "../DATABASE/sqlconnect.js";
import { auth } from "../MIDDLEWARES/auth.js";
import bcrypt from "bcrypt";

export const getSignup = (req,res) =>{
    res.redirect('signUp.html')
}

export const postSignup = (req,res) =>{
    const {name,email,password} = req.body;
    const con = connection();
    let query = `SELECT email FROM users WHERE email=?`;
    con.query(query,[email], async(err,result)=>{
        if (err) throw (err);
        if(result.length>0)
            {
                return  res.json({ 
                    success: false,
                    message: "USER ALREADY EXISTS"
                });
            } 

        let hashedPassword = await bcrypt.hash(password, 10);
        let query = `INSERT INTO users(name,email,password_hash) VALUES (?,?,?)`
        con.query(query,[name,email,hashedPassword],(err,result)=>{
            if (err) throw (err);
            console.log(result);
            res.json({ 
                success: true,
                message: "USER CREATED SUCCESSUFLLY"
            });
            // res.redirect('/');
            con.end();
        })

    })
    // console.log(name,email,password);
}

