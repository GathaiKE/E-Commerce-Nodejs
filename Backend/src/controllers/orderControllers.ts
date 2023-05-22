import {Request, Response, request} from "express";
import mssql from 'mssql'
import path from 'path'
import {sqlConfig} from "../config"
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import { Order,User,CartRequest, Cart } from "../interfaces/interfaces";

// Make a new order an order

export const newOrder= async (req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const pool = await mssql.connect(sqlConfig)
        
        let order:Cart[] = (await pool.request().input('user_id',user_id).query(`SELECT * FROM cart WHERE user_id = '${user_id}'`)).recordset

        if(!order[0]){
            return res.status(404).json({message:"Add items to cart first"})
        }

        let cart_id = order[0].cart_id
        let order_status = 'pending'
        await pool.request()
        .input('cart_id',cart_id)
        .input('user_id',user_id)
        .input('order_status',order_status)
        .execute('createOrder')
        return res.status(201).json({message:"Your order has been received!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// get all orders

export const getAllOrders = async(req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const pool=await mssql.connect(sqlConfig)
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
        const user_id = req.data.user_id
        const pool= await mssql.connect(sqlConfig)
        let order:Order[]= (await(await pool.request()
        .input('user_id',user_id)
        .query(`SELECT * FROM orders WHERE user_id = '${user_id}'`))).recordset
        
        if(!order[0]){
            return res.status(404).json({message:"User has no orders!"})
        }

        return res.status(200).json(order) 

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// update order(admin)

export const completeOrder = async (req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const {order_id}=req.body

        const pool = await mssql.connect(sqlConfig)
        
        let order:Order[]= (await (await pool).request().input('user_id',user_id).input('order_id',order_id).query(`SELECT * FROM orders WHERE user_id = '${user_id}' AND order_id = '${order_id}'`)).recordset
        
        if(!order[0]){
            return res.status(404).json({message:"Order not found!"})
        }

        let order_status = 'Complete'
        await pool.request()
        .input('user_id',user_id)
        .input('order_id',order_id)
        .input('order_status',order_status)
        .execute('completeOrder')
        return res.status(201).json({message:"Order Completed!"})

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// Cancel an order

export const cancelOrder= async (req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const {order_id} = req.body
        const pool = await mssql.connect(sqlConfig)

        let userOrders:Order[] = (await pool.request().input('user_id',user_id).query(`SELECT * FROM orders WHERE user_id = '${user_id}'`)).recordset

        if(!userOrders[0]){
            return res.status(404).json({message:"User has no orders"})
        }
        let order_status = 'Canceled'
        await pool.request()
        .input('user_id',user_id)
        .input('order_id',order_id)
        .input('order_status',order_status).execute("cancelOrder")
        return res.status(201).json({message:"Order cancelled!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}