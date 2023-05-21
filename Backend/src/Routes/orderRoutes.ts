import {Router} from "express"
import { newOrder,getUserOrder,getAllOrders,cancelOrder,updateOrder } from "../controllers/orderControllers"
import { verifyUser } from "../middlewear/userVerify"
import { verifyAdmin } from "../middlewear/adminVerify"


const orderRoutes=Router()

orderRoutes.post('',verifyUser, newOrder)
orderRoutes.get('/orders',verifyAdmin, getAllOrders)
orderRoutes.get('/user',verifyUser, getUserOrder)
orderRoutes.post('/update/',verifyAdmin, updateOrder)
orderRoutes.post('/cancel/',verifyUser, cancelOrder)


export default orderRoutes