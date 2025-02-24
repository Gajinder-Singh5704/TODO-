import { connection } from "../DATABASE/sqlconnect.js"

export const goHome = (req,res)=>{
        res.redirect('home.html');
}

export const getTasks = (req,res) =>{
        let user_id = req.user_id;
        const conn = connection();
        const q = `SELECT * FROM tasks WHERE user_id = ?`;
        conn.query(q,[user_id],(err,result)=>{
            if(err) throw (err);
             let content = result;
             res.json(content);
        })
        conn.end();    
}

