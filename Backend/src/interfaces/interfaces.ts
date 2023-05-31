import {Request} from 'express'

export interface ExtendedRequest extends Request{
    data: DecodedData
    body:{
        user_id?:string
        product_id?:string
        username:string
        email:string
        email_sent:number
        role:string
        password:string
        data?:DecodedData
    }
    params:{
        user_id?:string
        product_id?:string
        email:string
        password:string
    }
}


export interface User{
    user_id:string
    username:string
    email:string
    email_sent:string
    role:string
    password:string
    resetEmailSent:number
}

export interface Cart{
    item_id:number
    cart_id:string
    user_id:string
    product_id:string
    product_name:string
    product_count:number
    product_price:number
    total_price:number
}

export interface CartRequest extends Request{
    data: DecodedData
    body:{
        item_id:string
        product_id:string
        user_id:string
        product_name:string
        images:string
        product_price:string
        total_price:string
        data?:DecodedData
        order_status?:string
        order_id?:number
    }
    params:{
        user_id:string
        item_id:string
        product_id:string
    }
}


export interface Order {
    order_id:number
    order_status: string
    user_id:string
}

export interface Product{
    product_id:string
    product_name:string
    descriptions:string
    images: string
    product_price:number
}

export interface DecodedData{
    user_id: string;
    username: string;
    email: string;
    role:string
}

export interface ProductRequest extends Request{
    data: DecodedData
    body:{
        product_name:string
        descriptions:string
        category:string
        images:string
        product_price:number
        data?:DecodedData

    }
    params:{
        product_id:string
    }
}