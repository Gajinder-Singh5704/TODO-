import { connection } from "../DATABASE/sqlconnect.js"

export const updateArchive= (req,res)=>{
    const user_id = req.user_id;
    const id = req.params.id;
    
    const con = connection();
    let q = `SELECT archived FROM tasks WHERE user_id = ? AND id = ?`;
    con.query(q,[user_id,id],(err,result)=>{
        if(err) throw (err);
            let bool;
            (result[0].archived == 0)? bool = 1: bool = 0;
             console.log(bool);
            q = `UPDATE tasks SET archived = ? WHERE user_id = ? AND id = ?`
            con.query(q,[bool,user_id,id],(err,result)=>{
                if(err) throw (err);
                console.log(result);
                res.send({
                    message : 'SUCCESS'
                });
            })

    })
}