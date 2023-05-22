import {Request, Response} from "express";
import mssql from 'mssql'
import path from 'path'
import {sqlConfig} from "../config"
import {v4 as uid} from "uuid"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import {ExtendedRequest,User} from "../interfaces/interfaces"
import { userValidatorSchema,resetPasswordSchema } from "../helpers/userValidation";



export const addUser=async (req:ExtendedRequest, res:Response)=>{
    try {
        let user_id=uid()
        const{username,email,email_sent='0',role='user',password}=req.body
        const {error}= userValidatorSchema.validate(req.body)
        if(error)(
            res.status(404).json(error.details[0].message)
        )
        let hPassword =await bcrypt.hash(password,7)
        const pool=await mssql.connect(sqlConfig)
        await pool.request()
        .input('user_id',user_id)
        .input('username',username)
        .input('email',email)
        .input('email_sent',email_sent)
        .input('role',role)
        .input('password',hPassword)
        .execute('insertUser')
        return res.status(201).json({message:"User added successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}




export const getAllUsers=async (req:Request,res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        let users:User[] = (await (await pool.request()).execute('getusers')).recordset
        return res.status(200).json(users)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getUserById=async(req:ExtendedRequest,res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        if(req.data){
        let user:User[]=(await(await pool.request())
        .input('user_id',req.data.user_id).execute('getUser')).recordset
        if(!user[0]){
            return res.status(404).json({message:"User not found!"})
        }
        return res.status(200).json(user[0])
        }
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getUserByEmail=async(req:ExtendedRequest,res:Response)=>{
    try {
        const email = req.data.email
        const pool = await mssql.connect(sqlConfig)
        let user:User[] = (await (await pool.request())
        .input('email',email)
        .execute('getUserByEmail')).recordset
        if(user){
            return res.status(200).json(user)
            
        }
        return res.status(404).json({message:"User not found"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const updateUser=async(req:ExtendedRequest,res:Response)=>{
    try {
        const {username,email}=req.body
        const user_id=req.data.user_id
        const pool=await mssql.connect(sqlConfig)
        let user:User[]=(await(await pool.request())
        .input('user_id',user_id).execute('getUser')).recordset
        if(!user[0]){
            return res.status(404).json({message:"User not found!"})
        }
        await pool.request()
        // .input('user_id',user_id)
        .input('username',username)
        .input('email',email)
        .execute('updateUser')
        return res.status(200).json({message:"User updated successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const deleteUser=async(req:ExtendedRequest,res:Response)=>{
    try {
        const user_id =req.data.user_id

        const pool= await mssql.connect(sqlConfig)
        let user:User[] =(await(await pool.request())
        .input('user_id',user_id).execute('getUser')).recordset
        if(!user[0]){
            return res.status(404).json({message:"User not found!"})
        }

        await pool.request().input('user_id',user_id).execute('deleteUser')
            
        return res.status(200).json({message:"User deleted successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const userLogin= async (req:ExtendedRequest, res:Response)=>{
    try {
        const{email,password}= req.body
        const pool = await mssql.connect(sqlConfig)
        let user:User[] = (await (await pool.request())
        .input('email',email)
        .execute('getUserByEmail')).recordset

        if(!user[0]){
            return res.status(404).json({message:"User does not exist!"})  
        }
        
        let correctPassword = await bcrypt.compare(password,user[0].password)
        if(!correctPassword){
            return res.status(404).json({message:"User does not exist!"})
        }

        const payload= user.map(usr=>{
            const {password, email_sent,role,...rest}=usr
            return rest
        })
        const token = jwt.sign(payload[0], process.env.SECRET_KEY as string,{expiresIn:"3600s"})
        // res.status(200).json(token)
        return res.json({mesage:"Login Successfull!",token})
    } catch (error:any) {
            return res.status(500).json(error.message)
    }
}

// export const resetPassword=async (req:Request<{email:string,newPassword:string}>, res:Response)=>{
//     try {
//         const{email,password}= req.body
//         const {error} = resetPasswordSchema.validate(req.body)
//         if(error){
//             return res.status(404).json({message:"Invalid"})
//         }


//     } catch (error) {
        
//     }
// }
export const resetPassword = async (req: ExtendedRequest, res: Response) => {
  try {
    const { password } = req.body;
    const {user_id} = req.params
    let hashedPassword = await bcrypt.hash(password, 10);
    const pool = await mssql.connect(sqlConfig);
    let user: User = (await (await pool.request())
    .input("user_id", user_id)
    .execute("getUserById")).recordset[0];
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await pool.request()
    .input("user_id", user_id)
      .input("password", hashedPassword)
      .execute("resetPassword");
    return res.status(200).json({ message: "User Password Updated" });
  } 
    catch (error: any) {
        return res.status(500).json(error.message);
  }
};