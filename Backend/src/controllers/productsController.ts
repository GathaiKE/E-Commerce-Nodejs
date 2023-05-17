import {Request, Response} from "express";
import mssql from 'mssql'
import {sqlConfig} from "../config"
import {v4 as uid} from "uuid"

interface ProductRequest extends Request{
    body:{
        product_name:string
        descriptions:string
        images:string
        product_price:number

    }
    params:{
        product_id:string
    }
}

interface Product{
    product_id:string
    product_name:string
    descriptions:string
    images: string
    product_price:number
}

//add a new product
export const addProduct=async (req:ProductRequest, res:Response)=>{
    try {
        let product_id=uid()
        console.log(product_id)
        const{product_name,descriptions,images,product_price}=req.body
        const pool=await mssql.connect(sqlConfig)
        await pool.request()
        .input('product_id',mssql.VarChar,product_id)
        .input('product_name',mssql.VarChar,product_name)
        .input('descriptions',mssql.VarChar,descriptions)
        .input('images',mssql.VarChar,images)
        .input('product_price',mssql.Decimal,product_price)
        .execute('insertProduct')
        return res.status(201).json({message:"Product added successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//update an existing product
export const updateProduct=async (req:Request<{product_id:string}>,res:Response)=>{
    try {
        const{product_name,description,images,product_price}=req.body
        const {product_id}=req.params
        const pool= await mssql.connect(sqlConfig)
        let product=(await(await pool.request()).input('product_id',product_id).execute('getProduct'))
        if(!product){
            return res.status(404).json({message:"Product not found!"})
        }
        await pool.request()
        .input('product_id',product_id)
        .input('product_name',product_name)
        .input('description',description)
        .input('images',images)
        .input('product_price',product_price)
        .execute('updateProduct')
        return res.status(200).json({message:"product updated successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//display all products
export const getAllProducts=async (req:Request,res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
    let products:Product[] = (await (await pool.request()).execute('getProducts')).recordset
    res.status(200).json(products)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//display a single product
export const getProduct=async(req:Request<{product_id:string}>,res:Response)=>{
    try {
        const {product_id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let product:Product[]=(await(await pool.request())
        .input('product_id',product_id).execute('getProduct')).recordset
        if(product){
            return res.status(200).json(product)
        }
        res.status(404).json({message:"Product not found!"})
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