import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { ExtendedRequest,DecodedData } from '../interfaces/interfaces';

<<<<<<< HEAD:Backend/src/middlewear/userVerify.ts
export const verifyUser =(req:ExtendedRequest, res:Response, next:NextFunction)=>{
=======
interface DecodedData{
    id: string;
    role: string;
}

interface ExtendedRequest extends Request{
    info?:DecodedData
}

export const verifyToken =(req:ExtendedRequest, res:Response, next:NextFunction)=>{
>>>>>>> aace9a092bf4def2c2164b836b890dd2c4fd080e:src/middlewear/verificationToken.ts
    try {
        const token = req.headers['token'] as string

        if(!token){
<<<<<<< HEAD:Backend/src/middlewear/userVerify.ts
            return res.status(401).json({message:'User is not registered'})
=======
            return res.status(401).json({message:'Not Authorized'})
>>>>>>> aace9a092bf4def2c2164b836b890dd2c4fd080e:src/middlewear/verificationToken.ts
        } 

        const dedodedData = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedData
        req.data=dedodedData
        
    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}

export const verifyAdmin =(req:ExtendedRequest, res:Response, next:NextFunction)=>{
    try {
        const token = req.headers['token'] as string

        if(!token){
            return res.status(401).json({message:'Not Authorized'})
        } 

        const decodedData = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedData
        req.info=decodedData
        if (decodedData.role!='admin') {
            return res.status(401).json({message:'Not Authorized'})
        }

    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}