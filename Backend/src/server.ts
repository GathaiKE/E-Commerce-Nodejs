import express,{json} from 'express'
import userRoutes from './Routes/userRoutes'
import productRoutes from './Routes/productsRoutes'
<<<<<<< HEAD:Backend/src/server.ts
import cartRoutes from './Routes/cartRoutes'
import orderRoutes from './Routes/orderRoutes'
=======
import { authJwt } from './helpers/userValidation'
>>>>>>> aace9a092bf4def2c2164b836b890dd2c4fd080e:src/server.ts

const app=express()
app.use(json())

app.use('/users',userRoutes)
app.use('/products',productRoutes)
<<<<<<< HEAD:Backend/src/server.ts
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)

=======
app.use(authJwt)


//  app.use('/server',router)
>>>>>>> aace9a092bf4def2c2164b836b890dd2c4fd080e:src/server.ts
app.listen(5000,()=>{
    console.log("server ready");
})