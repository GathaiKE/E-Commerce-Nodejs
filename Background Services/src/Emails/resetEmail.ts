import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'
import { sqlConfig } from '../config'
import { sendMail } from '../helpers/sendMail'
dotenv.config({path:path.resolve(__dirname,'../../.env')})

interface User{
    user_id:string
    username:string
    email:string
    emailSent:number
    role:string
    password:string
}

export const resetPasswordEmail=async()=>{
    const pool=await mssql.connect(sqlConfig)
    const users:User[]=(await (await pool.request())
    .query(`SELECT * FROM USERDB WHERE resetEmailSent=1`)).recordset
    for(let user of users){
        ejs.renderFile('Templates/reset.ejs',{name:user.username},async(err,html)=>{
            const messageOptions={
                from: process.env.EMAIL,
                to: user.email,
                subject: "Password Reset",
                html
            }
        
            try {
                await sendMail(messageOptions)
                await pool.request().query(`UPDATE USERDB SET resetEmailSent=0 WHERE id='${user.user_id}'`)
            } catch (error) {
                console.log(error);
            }
        })
    }
}