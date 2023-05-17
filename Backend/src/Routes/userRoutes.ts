import {Router} from 'express'
import { addUser,getAllUsers,getUserById,getUserByEmail,updateUser,deleteUser, userLogin } from '../controllers/userController'

const userRoutes=Router()

userRoutes.post('',addUser)
userRoutes.get('',getAllUsers)
userRoutes.post('/login',userLogin)
userRoutes.get('/:id',getUserById)
userRoutes.get('/email/:email',getUserByEmail)
userRoutes.put('/:id',updateUser)
userRoutes.delete('/:id',deleteUser)




export default userRoutes