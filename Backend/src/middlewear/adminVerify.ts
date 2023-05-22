import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { ExtendedRequest,DecodedData } from '../interfaces/interfaces';


export const verifyAdmin =(req:ExtendedRequest, res:Response, next:NextFunction)=>{
    try {
        const admtoken = req.headers['token'] as string
        
        if(!admtoken){
            return res.status(401).json({message:'Invalid user'})
        } 

        const adminData = jwt.verify(admtoken, process.env.SECRET_KEY as string) as DecodedData
        req.data=adminData

        if(adminData.email !== 'zaynsuper@customer.com'){
            return res.status(401).json({message:'User is not an Admin'})
        }

    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}