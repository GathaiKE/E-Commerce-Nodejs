import {Router} from 'express'
import { addProduct,getAllProducts,getProduct,updateProduct,deleteProduct } from '../controllers/productsController'
import { verifyAdmin } from '../middlewear/adminVerify'
import { verifyUser, } from '../middlewear/userVerify'


const productRoutes=Router()

productRoutes.post('/add',verifyAdmin, addProduct)
productRoutes.get('/getAll',verifyUser, getAllProducts)
productRoutes.get('/getProduct/:product_id',verifyUser, getProduct)
productRoutes.delete('/delete/:product_id',verifyAdmin, deleteProduct)
productRoutes.put('/update/:product_id',verifyAdmin, updateProduct)

export default productRoutes