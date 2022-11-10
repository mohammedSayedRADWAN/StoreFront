import { Router } from 'express'
import * as controllers from '../../controllers/userControler'
import { verify } from '../../midellware/authintication'

const routes = Router()

routes.post('/create', controllers.create)
routes.get('/showall', controllers.index)
routes.post('/login', controllers.cheak)
routes.get('/showById', verify, controllers.show)
routes.delete('/delete', verify, controllers.deleteUser)
export default routes
