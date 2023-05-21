import {Request, Response, request} from "express";
import mssql from 'mssql'
import path from 'path'
import {sqlConfig} from "../config"
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import { Order,User,CartRequest } from "../interfaces/interfaces";

// place an order

export const newOrder= async (req:CartRequest,res:Response)=>{
    try {
        let user_id= req.data.id
        const pool = await mssql.connect(sqlConfig)
        
        let order = (await pool.request().input('user_id',user_id).execute('getCartItems')).recordset
        if(!order){
            return res.status(404).json({message:"Cart is empty"})
        }
        let cart_id = order[0].cart_id
        let order_status = 'Pending'
        await pool.request()
        .input('cart_id',cart_id)
        .input('user_id',user_id)
        .input('order_status',order_status)
        .execute('createOrder')
        return res.status(201).json(order)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// Cancel an order

export const cancelOrder= async (req:CartRequest,res:Response)=>{
    try {
        let user_id = req.data.id
        const pool = await mssql.connect(sqlConfig)

        let userOrders:Order[] = (await pool.request().input('user_id',user_id).execute('getOrderByUserId')).recordset

        if(!userOrders){
            return res.status(404).json({message:"User has no orders"})
        }
        let order_id=userOrders[0].order_id
        await pool.request().input('order_id',order_id).execute("cancelOrder")
        return res.status(201).json({message:"Order cancelled!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// get all orders

export const getAllOrders = async(req:CartRequest,res:Response)=>{
    try {
        const user_id= req.data.id
        const pool=await mssql.connect(sqlConfig)
        let user:User[]=(await((await pool).request().input('user_id',user_id).execute('getUser'))).recordset
        if(user[0].role !== 'admin'){
            return res.status(403).json({message:"Access Denied!"})
        }

        let allOrders:Order[]= (await(await pool.request()).execute('getAllOrders')).recordset
        if(allOrders.length === 0){
            return res.json(404).json({message:"No orders made"})
        }
        return res.status(201).json(allOrders)

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// get orders of one user

export const getUserOrder = async (req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.id
        const pool= await mssql.connect(sqlConfig)
        let order:Order[]= (await(await pool.request()
        .input('user_id',user_id)
        .execute('getOrderById'))).recordset
        
        if(!order[0]){
            return res.status(404).json({message:"User has no orders!"})
        }

        return res.status(200).json(order) 

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// update order(admin)

export const updateOrder = async (req:CartRequest,res:Response)=>{
    try {
        const {order_id, order_status}=req.body

        const pool = mssql.connect(sqlConfig)
        
        let order:Order[]= (await (await pool).request().input('order_id',order_id).execute('getOrderById')).recordset
        
        if(!order){
            return res.status(404).json({message:"Order not found!"})
        }

        (await pool).request().input('order_id',order_id).input('order_status',order_status).execute('updateOrder')
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}