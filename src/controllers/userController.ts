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
import { userValidatorSchema } from "../helpers/userValidation";


export const addUser=async (req:ExtendedRequest, res:Response)=>{
    try {
        let id=uid()
        const{username,email,password,role="user"}=req.body
        const {error}= userValidatorSchema.validate(req.body)
        if(error)(
            res.status(404).json(error.message)
        )
        let hPassword =await bcrypt.hash(password,7)
        const pool=await mssql.connect(sqlConfig)
        await pool.request()
        .input('id',id)
        .input('username',username)
        .input('email',email)
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
        const {id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let user:User[]=(await(await pool.request())
        .input('id',id).execute('getUser')).recordset
        if(user){
            return res.status(200).json(user)
        }
        res.status(404).json({message:"User not found!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getUserByEmail=async(req:ExtendedRequest,res:Response)=>{
    try {
        const {email} = req.params
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
        const {id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let user:User[]=(await(await pool.request())
        .input('id',id).execute('getUser')).recordset
        if(!user){
            return res.status(404).json({message:"User not found!"})
        }
        await pool.request()
        .input('id',id)
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
        const {id}=req.params
        const pool= await mssql.connect(sqlConfig)
        let user:User[]=(await(await pool.request())
        .input('id',id).execute('getUser')).recordset
        if(!user){
            return res.status(404).json({message:"User not found!"})
        }
        await pool.request().input('id',id).execute('deleteUser')
        return res.status(200).json({message:"User deleted successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const userLogin= async (req:Request, res:Response)=>{
    try {
        const{email,password}= req.body
        const pool=await mssql.connect(sqlConfig)
        let user:User[] = await (await pool.request()
            .input('email', email)
            .execute('getUserByEmail')).recordset
        if(!user[0]){
            return res.status(404).json({message:"User not Found"})
            }
            let validPassword = await bcrypt.compare(password,user[0].password)
        
            if(!validPassword){
            return res.status(404).json({message:"User not Found"})
            }
        
            const payload= user.map(userr=>{
            const {password, email,username,...rest}=userr
            return rest
            })
            const token = jwt.sign(payload[0], process.env.SECRET_KEY as string)
            res.status(200).json(token)

    } catch (error:any) {
            return res.status(500).json(error.message)
    }
}

// admin Sarah Williams password: Pa$$w0rd!