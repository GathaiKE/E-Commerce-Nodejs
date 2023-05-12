import {Router} from 'express'
import { addProduct,getAllProducts,getProduct,updateProduct,deleteProduct } from '../controllers/productsController'

const productRoutes=Router()

productRoutes.post('',addProduct)
productRoutes.get('',getAllProducts)
productRoutes.get('/:id',getProduct)
productRoutes.delete('/:id',deleteProduct)
productRoutes.put('/:id',updateProduct)

export default productRoutes