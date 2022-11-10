import { Router } from 'express'
import * as controllers from '../../controllers/orderControler'
import { verify } from '../../midellware/authintication'

const routes = Router()

routes.post('/create', verify, controllers.createOrder)
routes.post('/addProduct', verify, controllers.addProduct)
routes.get('/showall', verify, controllers.index)
routes.get('/showCrruntOrder', verify, controllers.showCrruntOrder)
routes.get('/activeOrder', verify, controllers.getActiveOrdersByUserId)
routes.patch('/updateStatus', verify, controllers.updateOrderStatus)
routes.get('/completOrder', verify, controllers.getCompletedOrdersByUserId)
routes.delete('/deletOrder', verify, controllers.deletOrder)

export default routes
