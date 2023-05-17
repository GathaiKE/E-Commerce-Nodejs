import {Request} from 'express'

export interface ExtendedRequest extends Request{
    body:{
        username:string
        email:string
        role:string
        password:string
    }
    params:{
        id:string
        email:string
        password:string
        role:string
    }
}


export interface User{
    id:string
    username:string
    email:string
    password:string
    role:string
}

export interface ProductRequest extends Request{
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

export interface Product{
    id:string
    name:string
    description:string
    images: string
    price:number
}