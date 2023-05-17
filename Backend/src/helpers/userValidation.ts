import joi from 'joi'


export const userValidatorSchema =joi.object({
    username:joi.string().required(),
    email:joi.string().email().required(),
    role:joi.string().required().min(2),
    password:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,30}$`))
})