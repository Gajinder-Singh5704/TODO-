// Authentication middleware
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
export const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ 
            message: "Access denied. No token provided"
         })
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.redirect('/')
        }

        req.user_id = decoded.user_id;
        next(); 
    });
};