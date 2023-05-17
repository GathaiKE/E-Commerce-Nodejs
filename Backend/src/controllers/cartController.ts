import {Request, Response, request} from "express";
import mssql from 'mssql'
import path from 'path'
import {sqlConfig} from "../config"
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})

export const addToCart =async (req:Request,res:Response)=>{
    try {
    
    const { user_id, product_id } = req.body;
    const pool = await mssql.connect(sqlConfig);

    // const cartCheck = `SELECT * FROM cart WHERE user_id = ${user_id} AND product_id = ${product_id}`;
    const cartCheckResult = await pool.request()
    .input('user_id',user_id)
    .input('product_id',product_id)
    .execute('checkCart');
    if (cartCheckResult.recordset.length > 0) {
    const cartItem = cartCheckResult.recordset[0];
    const quantity = cartItem.product_count + 1;

    const updateQuery = `
        UPDATE cart
        SET product_quantity = ${quantity}
        WHERE user_id = ${user_id} AND product_id = ${product_id} And total_price = ${quantity} * @product_price`

    await pool.request().query(updateQuery);
    } else {
    const productQuery = `SELECT product_id, product_name, product_price FROM products WHERE product_id = ${product_id}`;
    const productResult = await pool.request().query(productQuery);

    if (productResult.recordset.length === 0) {
        return res.status(400).json({message:'Product does not exist'});
    }

    const product = productResult.recordset[0];
    const {product_name, product_price } = product;
    const product_quantity = 1;
    const total_price = product_quantity * product_price

    const insertQuery = `
        INSERT INTO cart (product_id, user_id, product_name, product_quantity, product_price,total_price)
        VALUES (${product_id}, ${user_id}, '${product_name}', ${product_quantity}, ${product_price},${total_price})
    `;

    await pool.request().query(insertQuery);
    }
    return res.status(200).json({message:"Added to cart!"});
} catch (error:any) {
    return res.status(500).json(error.message);
}
}