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
    }
}


export interface User{
    id:string
    username:string
    email:string
    password:string
}




