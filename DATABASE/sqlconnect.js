import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const host = process.env.HOST;
const user = process.env.USER;
const database = process.env.DATABASE;

 export const connection = () =>{
    try {
      
      const connection = mysql.createConnection({
        host: host,
        user: user,
        database: database,
        password: ''
      });
    
      console.log("connection succcessful");
    
      return  connection;
        connection.end();
    
    } 
    catch (err) {
              console.log(err);
            }

}
// connection();