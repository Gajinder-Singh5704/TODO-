import express from "express";
import { auth } from "../MIDDLEWARES/auth.js";
import { getLogin, postLogin,check } from "../CONTROLLERS/login.js";
import { getSignup,postSignup } from "../CONTROLLERS/signUp.js";
import { goHome,getTasks,userName } from "../CONTROLLERS/getTasks.js";
import { addTask } from "../CONTROLLERS/addTask.js";
import { deleteTask } from "../CONTROLLERS/delete.js";
import { updateTask } from "../CONTROLLERS/updateTask.js";
import { updateStatus } from "../CONTROLLERS/updateStatus.js";
import { updateArchive } from "../CONTROLLERS/updateArchive.js";
import { changePass, getReset, postChangePass,getChangePass } from "../CONTROLLERS/reset.js";
import { logout } from "../CONTROLLERS/logout.js";

const route = express.Router();

/****************************************************************************************GET REQUESTS******************************************************************************************/

route.get('/', getLogin);                                 //GET LOGIN PAGE
route.get('/signup', getSignup);                          //GET SIGNUP PAGE
route.get('/reset', getReset);                          //GET RESET PAGE
route.get('/:email/:token', getChangePass);                         
route.get('/home',auth,goHome);
route.get('/check',auth,check);
route.get('/username',auth,userName);                          
route.get('/tasks',auth,getTasks);                               //GET ALL TASKS
route.get('/logout',auth,logout);                          

// /****************************************************************************************POST REQUESTS****************************************************************************************/

route.post('/add',auth,addTask);                              //ADD NEW TASK
route.post('/login', postLogin);                         // Login form submits here
route.post('/signup', postSignup);                       // Signup form submits here
route.post('/changepass', changePass);                          //GET RESET PAGE
route.post('/postChangePass', postChangePass);                          //GET RESET PAGE

// /****************************************************************************************PUT REQUESTS*****************************************************************************************/

route.put('/update/:id',auth, updateTask);                       // UPDATE A TASK


route.patch('/updateStatus/:id',auth, updateStatus)
route.patch('/updateArchive/:id',auth, updateArchive)
// /****************************************************************************************PUT REQUESTS*****************************************************************************************/

route.delete('/delete/:id',auth, deleteTask);                       // DELETE A TASK
export default route;

