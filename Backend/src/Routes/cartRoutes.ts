import {Router} from "express"

import { addToCart } from "../controllers/cartController"

const cartRoutes=Router()

cartRoutes.post('', addToCart)


export default cartRoutes