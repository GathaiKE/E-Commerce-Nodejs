import express,{json} from 'express'
import userRoutes from './Routes/userRoutes'
import productRoutes from './Routes/productsRoutes'

const app=express()
app.use(json())
app.use('/users',userRoutes)
app.use('/products',productRoutes)


// app.use('/server',router)
app.listen(5000,()=>{
    console.log("server ready");
})