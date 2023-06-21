import mssql from 'mssql'
import { sqlConfig } from "../config";
import ejs from 'ejs';
import dotenv from 'dotenv'
import path from 'path'
import { sendMail } from '../Helpers/sendMail';
dotenv.config({path:path.resolve(__dirname, '../../.env')})

interface UserAnswered {
    uid: string
    username: string
    email: string
    role:string
    aid:string
    question_title:string
}

export const sendPreferredEmail = async() => {
    const pool = await mssql.connect(sqlConfig)
    const users: UserAnswered[] = (await (await pool.request().execute("getUsersForPreferred"))).recordset
    console.log(users);

    // looping through and send an email
    for (let user of users) {
        ejs.renderFile('dist/Template/preferred.ejs', {username:user.username, question:user.question_title}, async(err, html) => {
           if (err){
            console.log(err)
            return
           }
            //send email
                try {
                
                let messageOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Congrats!",
                    html
                }
                 await sendMail(messageOptions)   
                 //update the database email was sent
                await pool.request().input("uid",user.uid).input("aid",user.aid).execute("updateUserForPreferred");
                 
            } catch (error) {
                 console.log(error);
                    
            }
            
                   
        })
    }
};
