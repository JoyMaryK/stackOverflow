import mssql from 'mssql'
import { sqlConfig } from "../config";
import ejs from 'ejs';
import dotenv from 'dotenv'
import path from 'path'
import { sendMail } from '../Helpers/sendMail';
dotenv.config({path:path.resolve(__dirname, '../../.env')})

interface User {
    uid: string
    username: string
    email: string
    password: string
    emailSent: number
    isDeleted: number
    role:string
    location?:string
    about?:string
}

export const sendWelcomeEmail = async() => {
    const pool = await mssql.connect(sqlConfig)
    const users: User[] = (await (await pool.request()).query('SELECT * FROM USERS WHERE emailSent=0')).recordset
    console.log(users);

    // looping through and send an email
    for (let user of users) {
        ejs.renderFile('dist/Template/welcome.ejs', {username:user.username}, async(err, html) => {
           if (err){
            console.log(err)
            return
           }
            //send email
                try {
                
                let messageOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Welcome To Stackoverflow!",
                    html
                }
                 await sendMail(messageOptions)   
                 //update the database email was sent
                 await pool.request().query(`UPDATE Users SET emailSent=1 WHERE uid='${user.uid}'`);
                 
            } catch (error) {
                 console.log(error);
                    
            }
            
                   
        })
    }
};