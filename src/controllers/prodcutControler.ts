import { PRODCUT, prodcutInfo } from '../models/product'
import { Request, Response } from 'express'

const info = new prodcutInfo()

export const index = async (req: Request, res: Response) => {
  try {
    const products = await info.index()
    if (!products) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any products ,yet,please create product first'
      })
    }
    return res.json({
      status: 'success',
      message: 'products show successed',
      data: { ...products }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const product = await info.show(req.body.id)
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    return res.json({
      status: 'success',
      message: 'product show successed',
      data: { ...product }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const product: PRODCUT = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    }
    const newprodcut = await info.create(product)
    return res.json({
      status: 'success',
      message: 'product create successed',
      data: { ...newprodcut }
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await info.deleteProduct(req.body.id)
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    return res.json({
      status: 'success',
      message: 'product delete successed',
      data: { ...deleted }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

export const category = async (req: Request, res: Response) => {
  try {
    const product = await info.getProductBycategory(req.body.category)
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: `can not found product in this ${req.body.category}`
      })
    }
    return res.json({
      status: 'success',
      message: 'products show successed',
      data: { ...product }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
