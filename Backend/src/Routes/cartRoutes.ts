import {Router} from "express"

import { addToCart, removeItem,decreaseItem, getUserCart,clearCart,increaseItem } from "../controllers/cartController"
import { verifyUser } from "../middlewear/userVerify"

const cartRoutes=Router()

cartRoutes.post('/add',verifyUser, addToCart)
cartRoutes.put('/increase',verifyUser, increaseItem)
cartRoutes.put('/reduce',verifyUser, decreaseItem)
cartRoutes.delete('/remove',verifyUser, removeItem)
cartRoutes.get('/getUserCart',verifyUser, getUserCart)
cartRoutes.delete('/clear',verifyUser, clearCart)

export default cartRoutes