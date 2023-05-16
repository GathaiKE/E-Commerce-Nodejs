import joi from 'joi'
import { expressjwt } from 'express-jwt'

export const userValidatorSchema =joi.object({
    username:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))
})

export const authJwt=()=>{
    const secret=process.env.SECRET_KEY as string
    return expressjwt({
        secret,
        algorithms:['HS256']
    })
}