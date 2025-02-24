import { connection } from "../DATABASE/sqlconnect.js";

export const deleteTask = (req,res) =>{
    const user_id = req.user_id;
    const task_id = req.params.id;

    const con = connection();
    let q = `DELETE FROM tasks WHERE user_id = ? AND id = ?`;

    con.query(q,[user_id,task_id],(err,result)=>{
        if(err) throw(err);
        console.log(result);
        res.send('SUCCESS');
    })
    con.end();
}