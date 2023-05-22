import {Router} from 'express'
import { addUser,getAllUsers,getUserById,getUserByEmail,updateUser,deleteUser, userLogin } from '../controllers/userController'
import { verifyAdmin } from '../middlewear/adminVerify'
import { verifyUser } from '../middlewear/userVerify'


const userRoutes=Router()

userRoutes.post('/register',addUser)
userRoutes.post('/login',userLogin)
userRoutes.get('/getAll',verifyAdmin, getAllUsers)
userRoutes.get('/getUser',verifyUser, getUserById)
userRoutes.get('/email',verifyUser, getUserByEmail)
userRoutes.put('/update',verifyUser, updateUser)
userRoutes.delete('/delete',verifyUser, deleteUser)




export default userRoutes