import {Router} from 'express'
import { addProduct,getAllProducts,getProduct,updateProduct,deleteProduct } from '../controllers/productsController'
import { verifyAdmin } from '../middlewear/verificationToken'

const productRoutes=Router()

productRoutes.post('',verifyAdmin,addProduct)
productRoutes.get('',getAllProducts)
productRoutes.get('/:id',getProduct)
productRoutes.delete('/:id',verifyAdmin,deleteProduct)
productRoutes.put('/:id',verifyAdmin,updateProduct)

export default productRoutes