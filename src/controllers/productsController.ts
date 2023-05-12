import {Request, Response} from "express";
import mssql from 'mssql'
import {sqlConfig} from "../config"
import {v4 as uid} from "uuid"

interface ProductRequest extends Request{
    body:{
        name:string
        description:string
        images:string
        price:number

    }
    params:{
        id:string
    }
}

interface Product{
    id:string
    name:string
    description:string
    images: string
    price:number
}

//add a new product
export const addProduct=async (req:ProductRequest, res:Response)=>{
    try {
        let id=uid()
        const{name,description,images,price}=req.body
        const pool=await mssql.connect(sqlConfig)
        await pool.request()
        .input('id',mssql.VarChar,id)
        .input('name',mssql.VarChar,name)
        .input('description',mssql.VarChar,description)
        .input('images',mssql.VarChar,images)
        .input('price',mssql.Decimal,price)
        .execute('insertProduct')
        return res.status(201).json({message:"Product added successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//update an existing product
export const updateProduct=async (req:Request<{id:string}>,res:Response)=>{
    try {
        const{name,description,images,price}=req.body
        const {id}=req.params
        const pool= await mssql.connect(sqlConfig)
        let product=(await(await pool.request()).input('id',id).execute('getProduct'))
        if(!product){
            return res.status(404).json({message:"Product not found!"})
        }
        await pool.request()
        .input('id',id)
        .input('name',name)
        .input('description',description)
        .input('images',images)
        .input('price',price)
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
export const getProduct=async(req:Request<{id:string}>,res:Response)=>{
    try {
        const {id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let product:Product[]=(await(await pool.request())
        .input('id',id).execute('getProduct')).recordset
        if(product){
            return res.status(200).json(product)
        }
        res.status(404).json({message:"Product not found!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// delete a product
export const deleteProduct=async(req:Request<{id:string}>,res:Response)=>{
    try {
        const {id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let product:Product[]=(await(await pool.request())
        .input('id',id).execute('getProduct')).recordset[0]
        if(!product){
        return  res.status(404).json({message:"Product not found!"})
        }
        await pool.request()
        .input('id',id)
        .execute('deleteProduct')
        return res.status(200).json({message:"Product deleted successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}