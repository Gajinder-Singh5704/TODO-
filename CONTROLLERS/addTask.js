import { connection } from "../DATABASE/sqlconnect.js"


export const addTask = (req,res) =>{
    const user_id = req.user_id;
    const {label,title,description,dueDate,status,archive}=req.body;
    console.log(label,title,description,dueDate,status,archive);
    const con = connection();
    let q = `INSERT INTO tasks(user_id,title,description,due_date,status,archived,label) VALUES (?,?,?,?,?,?,?)`
    con.query(q,[user_id,title,description,dueDate,status,archive,label],(err,result)=>{
        if(err) throw(err);
        console.log(result);
        res.send({
            message : 'SUCCESS'
        });
    })
    con.end();
}
