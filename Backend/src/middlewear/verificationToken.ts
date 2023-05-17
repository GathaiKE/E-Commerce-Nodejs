import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface DecodedData{
    id: string;
    name: string;
    email: string;
}

interface ExtendedRequest extends Request{
    info?:DecodedData
}

export const verifyToken =(req:ExtendedRequest, res:Response, next:NextFunction)=>{
    try {
        const token = req.headers['token'] as string

        if(!token){
            return res.status(401).json({message:'player is not Authorized'})
        } 

        const dedodedData = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedData
        req.info=dedodedData

    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}