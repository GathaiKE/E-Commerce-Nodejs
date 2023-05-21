import {Router} from "express"

import { addToCart, removeItem, getUserCart,clearCart,increaseItem } from "../controllers/cartController"
import { verifyUser } from "../middlewear/userVerify"

const cartRoutes=Router()

cartRoutes.post('/add',verifyUser, addToCart)
cartRoutes.put('/increase', increaseItem)
cartRoutes.put('/reduce', removeItem)
cartRoutes.get('/getUserCart', getUserCart)
cartRoutes.delete('/clear', clearCart)

export default cartRoutes