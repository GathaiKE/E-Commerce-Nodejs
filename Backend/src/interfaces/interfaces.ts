import {Request} from 'express'

export interface ExtendedRequest extends Request{
    body:{
        username:string
        email:string
        role:string
        password:string
    }
    params:{
        user_id:string
        email:string
        password:string
    }
}


export interface User{
    user_id:string
    username:string
    email:string
    password:string
}




