import express from "express";
import cors from "cors";
import route from "./ROUTES/routes.js";
import path from "path";
import cookieParser from "cookie-parser";
import { auth } from "./MIDDLEWARES/auth.js";
const app = express();

app.use(cookieParser());
app.use(cors());
// app.use(cors({
//     origin: "http://127.0.0.1:5500", // Allow only frontend origin
//     credentials: true, // Allow cookies/auth headers
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] // Allow all methods
// }));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(process.cwd(),'/views')))
app.use(express.static(path.join(process.cwd(),'/public')))
app.use(express.static(path.join(process.cwd(),'/resources')))

app.use('/',route)

app.listen(3000, () => console.log("Server running on port 3000"));

// app.get('/',(req,res)=>{
//     res.json(tasks);
// })
// app.post('/add',(req,res)=>{
//     // res.send('okayy g')
//     const {label,title,description,dueDate,status,archive} = req.body;
//     let data = {
//         label: label,
//         title: title,
//         description: description,
//         dueDate: dueDate,
//         status: status,
//         archive: archive
//     }
//     console.log(data)
//     res.send(data);
// })


// app.put('/update',(req,res)=>{
//     const {id,label,title,description,dueDate,status
//         ,archive} = req.body;
//     let data = {
//         id:id,
//         label: label,
//         title: title,
//         description: description,
//         dueDate: dueDate,
//         status:status,
//         archive:archive
//     }
//     console.log(data)
//     res.send(data);
// })

// app.patch('/complete/:id',(req,res)=>{
//     console.log(req.params.id)
//     res.send(req.params.id)
// })
// app.patch('/archive/:id',(req,res)=>{
//     console.log(req.params.id)
//     res.send(req.params.id)
// })


// app.delete('/delete/:id',(req,res)=>{
//     let id = req.params.id;
//     console.log(id)
//     res.send(id);
// })

