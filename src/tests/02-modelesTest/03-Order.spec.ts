import { ORDER, orderInfo } from '../../models/order'
import { PRODCUT, prodcutInfo } from '../../models/product'
import { USER, userInfo } from '../../models/user'

import client from '../../database'
const info = new orderInfo()
const infoP = new prodcutInfo()
const infoU = new userInfo()
describe('order model', () => {
  describe('serves are exisit', () => {
    it('create method that return order was created is defiend', () => {
      expect(info.createOrder).toBeDefined()
    })
    it('create method that return product added is defiend', () => {
      expect(info.addProduct).toBeDefined()
    })
    it(' getOrders method that return all orders by id of users is defiend', () => {
      expect(info.getOrders).toBeDefined()
    })
    it('should show method that return specifc order by id of user is defiend', () => {
      expect(info.showCrruntOrder).toBeDefined()
    })

    it('deleteProduct method that return order was deleted is defiend', () => {
      expect(info.deleteOrder).toBeDefined()
    })

    it('createOrder method is defiend', () => {
      expect(info.createOrder).toBeDefined()
    })
    it('getActiveOrdersByUserId method is defiend', () => {
      expect(info.getActiveOrdersByUserId).toBeDefined()
    })

    it('getCompletedOrdersByUserId method is defiend', () => {
      expect(info.getCompletedOrdersByUserId).toBeDefined()
    })

    it('updateOrderStatus method is defiend', () => {
      expect(info.updateOrderStatus).toBeDefined()
    })
  })
  describe('servies of ORDER working correctly', () => {
    const user: USER = {
      id: 3,
      firstname: 'maged2',
      password_digest: '12345',
      lastname: 'ahamed'
    }

    const product: PRODCUT = {
      id: 3,
      name: 'shampo2',
      price: '50',
      category: 'cleaning'
    }
    beforeAll(async () => {
      const connect = await client.connect()
      const sql = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1'
      await connect.query(sql)
      connect.release()
      await infoU.create(user)
      await infoP.create(product)
      //console.log(createdUser);
      //console.log(createdProduct);
    })
    afterAll(async () => {
      infoU.deleteUser(user.id as number)
      infoP.deleteProduct(product.id as number)
      info.deleteOrder(order.id as number)
    })
    const order: ORDER = {
      id: 1,
      user_id: user.id,
      product_id: product.id,
      quantity: 5,
      status_order: 'active'
    }
    //console.log(order);

    it(' createOrder method should return order created', async () => {
      const newOrder = await info.createOrder(order.user_id as number, order.status_order)
      //console.log(newOrder);

      expect(newOrder.user_id).toEqual(order.user_id)
      expect(newOrder.status_order).toEqual(order.status_order)
    })
    it('add product method', async () => {
      const addProduct = await info.addProduct(
        order.product_id as number,
        order.id as number,
        order.quantity
      )
      // console.log(addProduct);

      expect(addProduct.quantity).toEqual(order.quantity)
      expect(addProduct.id).toEqual(2)
      expect(addProduct.product_id).toEqual(product.id)
    })
    it(' show method should return one product have this id', async () => {
      const ordertById = (await info.getOrders(user.id as number)) as ORDER[]
      //console.log(user.id as number);

      expect(ordertById[0].status_order).toEqual('active')
      expect(ordertById[0].user_id).toEqual(3)
    })

    it(' showCrruntOrder method should return current order', async () => {
      const currentOrder = await info.showCrruntOrder(user.id as number)
      expect(currentOrder.status_order).toBe(order.status_order)
      expect(currentOrder.user_id).toEqual(3)
    })
    it('getActiveOrdersByUserId method should return Active Order', async () => {
      const ActiveOrder = await info.getActiveOrdersByUserId(user.id as number)
      expect(ActiveOrder[0].status_order).toEqual('active')
    })
    it('getCompletedOrdersByUserId method should return Completed Order', async () => {
      const CompletedOrder = await info.getCompletedOrdersByUserId(user.id as number)
      expect(CompletedOrder).toEqual([])
    })

    it('updateOrderStatus method should return update Order', async () => {
      const status = 'complete'
      const updateOrder = await info.updateOrderStatus(status as string, order.id as number)
      expect(updateOrder.status_order).toEqual('complete')
    })

    it('deleteOrder method should return delete Order', async () => {
      const deleteOrder = await info.deleteOrder(order.id as number)
      expect(deleteOrder.id).toEqual(order.id)
    })
  })
})
