import {Router} from 'express'
import { addProduct,getAllProducts,getProduct,updateProduct,deleteProduct } from '../controllers/productsController'
import { verifyAdmin } from '../middlewear/adminVerify'
import { verifyUser, } from '../middlewear/userVerify'


const productRoutes=Router()

productRoutes.post('',verifyAdmin, addProduct)
productRoutes.get('',verifyUser, getAllProducts)
productRoutes.get('/:product_id',verifyUser, getProduct)
productRoutes.delete('/:product_id',verifyAdmin, deleteProduct)
productRoutes.put('/:product_id',verifyAdmin, updateProduct)

export default productRoutes