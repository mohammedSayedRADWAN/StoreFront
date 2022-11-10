import { Router } from 'express'
import * as controllers from '../../controllers/prodcutControler'
import { verify } from '../../midellware/authintication'

const routes = Router()

routes.post('/create', controllers.create)
routes.get('/showall',  controllers.index)
routes.get('/showById', controllers.show)
routes.delete('/delete', verify, controllers.deleteProduct)
routes.put('/productsOfCategory', controllers.category)
export default routes
