import { connection } from "../DATABASE/sqlconnect.js";

export const updateStatus= (req,res)=>{
       const user_id = req.user_id;
        const id = req.params.id;
        
        const con = connection();
        let q = `SELECT status FROM tasks WHERE user_id = ? AND id = ?`;
        con.query(q,[user_id,id],(err,result)=>{
            if(err) throw (err);
                let bool;
                (result[0].status == 0)? bool = 1: bool = 0;
                 console.log(bool);
                q = `UPDATE tasks SET status = ? WHERE user_id = ? AND id = ?`
                con.query(q,[bool,user_id,id],(err,result)=>{
                    if(err) throw (err);
                    console.log(result); 
                    res.send({
                        message : 'SUCCESS'
                    });
                })
    
        })
}