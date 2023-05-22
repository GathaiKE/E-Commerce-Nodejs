import {Request, Response, request} from "express";
import mssql from 'mssql'
import path from 'path'
import {sqlConfig} from "../config"
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import { Cart, Product, User,CartRequest } from "../interfaces/interfaces";
import { ExtendedRequest } from "../interfaces/interfaces";
import { v4 as uid } from "uuid";

// Adding a product to the cart.
export const addToCart = async(req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        let item_id = uid()
        const { product_id}=req.body 
        // Tried to make the user id and cart Id the same for consistency
        let cart_id = user_id
        // const user_id=req.data.id
        const pool=await mssql.connect(sqlConfig)

        let user:User[]=(await(await pool.request())
        .input('user_id',user_id).execute('getUser')).recordset

        let product:Product[] = (await(await pool.request())
        .input('product_id',product_id)
        .execute('getProduct')).recordset

        if (!product[0]) {
            return res.status(201).json({message:"Product does not exist"});
        }

        let product_price=product[0].product_price
        let product_count = 1
        let total_price = product_price * product_count

        await pool.request()
        .input('item_id',item_id)
        .input('cart_id',cart_id)
        .input('user_id',user_id)
        .input('product_id',product_id)
        .input('product_count',product_count)
        .input('product_price',product_price)
        .input('total_price',total_price)
        .execute('addToCart')
        return res.status(201).json({message: 'Product added to the cart successfully.' });
    
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const increaseItem = async(req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const {product_id} = req.body

        const pool = await mssql.connect(sqlConfig)

        let cartItem:Cart[] = (await(await pool.request())
        .input('user_id',user_id)
        .input('product_id',product_id)
        .query(`SELECT * FROM cart WHERE user_id = '${user_id}' AND product_id = '${product_id}'`)).recordset;

        if (cartItem[0]) {
            let product_count = cartItem[0].product_count + 1
            let total_price = cartItem[0].total_price + cartItem[0].product_price

            await pool.request()
            .input('user_id',user_id)
            .input('product_id',product_id)
            .input('product_count',product_count)
            .input('total_price',total_price)
            .query(`UPDATE cart SET product_count = '${product_count}',total_price='${total_price}' WHERE user_id = '${user_id}' AND product_id = '${product_id}'`)

            return res.status(201).json(cartItem);
            
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// decreasing single item in cart cart
export const decreaseItem= async (req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const {product_id} = req.body
        const pool = await mssql.connect(sqlConfig);
        let cartItem:Cart[]=(await(await pool.request())
        .input('user_id',user_id)
        .input('product_id',product_id)
        .execute('checkCart')).recordset

        if (cartItem[0].product_count > 0) {
            let product_count = cartItem[0].product_count - 1
            let total_price = cartItem[0].total_price - cartItem[0].product_price

            await pool.request()
            .input('user_id',user_id)
            .input('product_id',product_id)
            .input('product_count',product_count)
            .input('total_price',total_price)
            .query(`UPDATE cart SET product_count = '${product_count}',total_price='${total_price}' WHERE user_id = '${user_id}' AND product_id = '${product_id}'`)

            return res.status(201).json(cartItem);
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// getting one users cart
export const getUserCart = async (req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const pool= await mssql.connect(sqlConfig)
        let cart:Cart[]=(await (await pool.request())
        .input('user_id',user_id)
        .query(`SELECT * FROM cart WHERE user_id='${user_id}'`)).recordset
        if(!cart[0]){
            return res.status(200).json({mwssage:"Cart is empty"})
        }
        return res.status(201).json(cart)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// removing entire item from cart cart
export const removeItem= async (req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const {product_id} = req.body
        const pool = await mssql.connect(sqlConfig);
        let cartItem:Cart[]=(await(await pool.request())
        .input('user_id',user_id)
        .input('product_id',product_id)
        .execute('checkCart')).recordset

        if (!cartItem[0]) {
            return res.status(201).json({message:"Item does not exist!"});

        }
            await pool.request()
            .input('user_id',user_id)
            .input('product_id',product_id)
            .query(`DELETE FROM cart WHERE user_id = '${user_id}' AND product_id = '${product_id}'`)

            return res.status(201).json({message:"Item removed from the cart!"});
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// Removing all items from cart

export const clearCart = async (req:CartRequest,res:Response)=>{
    try {
        const user_id = req.data.user_id
        const pool = await mssql.connect(sqlConfig)
        let cart:Cart[]=(await(await pool.request())
        .input('user_id',user_id)
        .query(`SELECT * FROM cart WHERE user_id='${user_id}'`)).recordset
        if(!cart[0]){
            return res.status(404).json({message:"Cart is empty"})
        }
        await pool.request().input('user_id',user_id).query(`DELETE FROM cart WHERE user_id = '${user_id}'`)

        return res.status(200).json({message:"Cart cleared successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)        
    }}