import { orderInfo } from '../models/order'
import { Request, Response } from 'express'
const info = new orderInfo()

export const index = async (req: Request, res: Response) => {
  try {
    const orders = await info.getOrders(req.body.user_id)

    if (orders.length == 0) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any orders ,yet,please create order first'
      })
    }
    return res.json({
      status: 'success',
      message: 'orders show successed',
      data: { orders }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
export const showCrruntOrder = async (req: Request, res: Response) => {
  try {
    const orders = await info.showCrruntOrder(req.body.user_id)

    if (!orders) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any crunet order ,yet,please create order first'
      })
    }
    return res.json({
      status: 'success',
      message: 'order crrunet show successed',
      data: { orders }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

export const getActiveOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await info.getActiveOrdersByUserId(req.body.user_id)
    if (orders.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any active order ,yet,please create order first'
      })
    }
    return res.json({
      status: 'success',
      message: 'order active show successed',
      data: { orders }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

export const getCompletedOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await info.getCompletedOrdersByUserId(req.body.user_id)
    if (orders.length == 0) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any completed order ,yet,please create order first'
      })
    }
    return res.json({
      status: 'success',
      message: 'order completed show successed',
      data: { orders }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.body.user_id
    const status_order: string = req.body.status_order

    const orders = await info.createOrder(user_id, status_order)
    if (!orders) {
      return res.status(404).json({
        status: 'error',
        message: 'not created order'
      })
    }
    return res.json({
      status: 'success',
      message: 'order created successed',
      data: { ...orders }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product_id: number = req.body.product_id
    const order_id: number = req.body.order_id
    const quantity: number = req.body.quantity

    const orders = await info.addProduct(product_id, order_id, quantity)
    if (!orders) {
      return res.status(404).json({
        status: 'error',
        message: 'not added Product to order'
      })
    }
    return res.json({
      status: 'success',
      message: 'product aded to order successed',
      data: { ...orders }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await info.updateOrderStatus(req.body.status, req.body.id)

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any order by this id ,please try create order first'
      })
    }
    return res.json({
      status: 'success',
      message: 'order updated successed',
      data: { ...order }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
export const deletOrder = async (req: Request, res: Response) => {
  try {
    const order = await info.deleteOrder(req.body.orderId)
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any order ,yet,please create order first'
      })
    }
    return res.json({
      status: 'success',
      message: 'orders deleted successed',
      data: { order }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
