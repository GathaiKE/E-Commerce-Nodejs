import joi from 'joi'
import { expressjwt } from 'express-jwt'

export const userValidatorSchema =joi.object({
    username:joi.string().required(),
    email:joi.string().email().required(),
<<<<<<< HEAD:Backend/src/helpers/userValidation.ts
    role:joi.string().required().min(2),
    password:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,30}$`))
})
=======
    password:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))
})

export const authJwt=()=>{
    const secret=process.env.SECRET_KEY as string
    return expressjwt({
        secret,
        algorithms:['HS256']
    })
}
>>>>>>> aace9a092bf4def2c2164b836b890dd2c4fd080e:src/helpers/userValidation.ts
