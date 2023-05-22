import {Router} from "express"
import { newOrder,getUserOrder,getAllOrders,cancelOrder,completeOrder } from "../controllers/orderControllers"
import { verifyUser } from "../middlewear/userVerify"
import { verifyAdmin } from "../middlewear/adminVerify"


const orderRoutes=Router()

orderRoutes.post('/newOrder',verifyUser, newOrder)
orderRoutes.get('/allOrders',verifyUser, getAllOrders)
orderRoutes.get('/user',verifyUser, getUserOrder)
orderRoutes.put('/complete',verifyUser, completeOrder)
orderRoutes.put('/cancel',verifyUser, cancelOrder)


export default orderRoutes