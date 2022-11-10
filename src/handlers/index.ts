import Router from 'express'
import userRouter from './api/user'
import productRouter from './api/product'
import ordertRouter from './api/order'

const routes = Router()
routes.use('/orders', ordertRouter)
routes.use('/products', productRouter)
routes.use('/users', userRouter)
export default routes
