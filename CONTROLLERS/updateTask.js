import { connection } from "../DATABASE/sqlconnect.js";

export const updateTask = (req,res) =>{
    const id = req.params.id;
    const user_id = req.user_id;
    const {label,title,description,dueDate,status,archive} = req.body;
     
    const con = connection();
    let q = `UPDATE tasks SET title = ?, description = ?,due_date = ?, status = ?, archived = ?, label = ? WHERE user_id = ? AND id = ? `;
    
    con.query(q,[title,description,dueDate,status,archive,label,user_id,id],(err,result)=>{
        if(err) throw (err);
            console.log(result);
            res.send({
                message : 'SUCCESS'
            });
    })
    
}