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
    const users: UserAnswered[] = (await (await pool.request()).query(` SELECT
    U.uid,
    A.aid,
    U.username,
    U.email,
    U.role,
    Q.title AS question_title
  FROM
    users U
  JOIN
    answers A ON U.uid = A.uid
  JOIN
    questions Q ON Q.qid = A.qid
    
    where A.isPrefered = 1 and A.emailSent=0;`)).recordset
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
                 await pool.request().query(`UPDATE Answers SET emailSent=1 WHERE uid='${user.uid}' and aid='${user.aid}'`);
                 
            } catch (error) {
                 console.log(error);
                    
            }
            
                   
        })
    }
};