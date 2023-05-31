import {Request, Response} from "express";
import mssql from 'mssql'
import {sqlConfig} from "../config"
import {v4 as uid} from "uuid"
import { ExtendedRequest,User,ProductRequest,Product } from "../interfaces/interfaces";


//add a new product
export const addProduct=async (req:ProductRequest, res:Response)=>{
    try {
        let product_id=uid()
        const{product_name,descriptions,category,images,product_price}=req.body
        const pool=await mssql.connect(sqlConfig)
        await pool.request()
        .input('product_id',mssql.VarChar,product_id)
        .input('product_name',mssql.VarChar,product_name)
        .input('descriptions',mssql.VarChar,descriptions)
        .input('category',mssql.VarChar,category)
        .input('images',mssql.VarChar,images)
        .input('product_price',mssql.Decimal,product_price)
        .execute('insertProduct')
        return res.status(201).json({message:"Product added successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//update an existing product
export const updateProduct=async (req:ProductRequest,res:Response)=>{
    try {
        const{product_name,descriptions,category,images,product_price}=req.body
        const {product_id}=req.params
        const pool= await mssql.connect(sqlConfig)
        let product:Product[]=(await(await pool.request()).input('product_id',product_id).execute('getProduct')).recordset
        if(!product[0]){
            return res.status(404).json({message:"Product not found!"})
        }
        await pool.request()
        .input('product_id',product_id)
        .input('product_name',product_name)
        .input('descriptions',descriptions)
        .input('category',category)
        .input('images',images)
        .input('product_price',product_price)
        .execute('updateProduct')
        return res.status(200).json({message:"Product updated successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//display all products
export const getAllProducts=async (req:Request,res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
    let products:Product[] = (await (await pool.request()).execute('getProducts')).recordset
    if(products.length===0){
        return res.status(404).json({message:"No products!"})
    }
    return res.status(200).json(products)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//display a single product
export const getProduct=async(req:Request<{product_id:string}>,res:Response)=>{
    try {
        const {product_id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let products:Product[] = (await (await pool.request())
        .input('product_id',product_id)
        .execute('getProduct')).recordset
        if(products.length===0){
            return res.status(404).json({message:"Product not found!"})
        }else{
            return res.status(200).json(products)
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// delete a product
export const deleteProduct=async(req:Request<{product_id:string}>,res:Response)=>{
    try {
        const {product_id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let product:Product[]=(await(await pool.request())
        .input('product_id',product_id).execute('getProduct')).recordset[0]
        if(!product){
        return  res.status(404).json({message:"Product not found!"})
        }
        await pool.request()
        .input('product_id',product_id)
        .execute('deleteProduct')
        return res.status(200).json({message:"Product deleted successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}