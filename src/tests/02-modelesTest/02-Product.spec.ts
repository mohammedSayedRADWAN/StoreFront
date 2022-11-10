import { PRODCUT, prodcutInfo } from '../../models/product'
import client from '../../database'
const info = new prodcutInfo()
describe('product model', () => {
  describe('serves are exisit', () => {
    it('should create method that return product was created is defiend', () => {
      expect(info.create).toBeDefined()
    })

    it('should index method that return all products is defiend', () => {
      expect(info.index).toBeDefined()
    })
    it('should show method that return specifc product by id is defiend', () => {
      expect(info.show).toBeDefined()
    })

    it('should deleteProduct method that return user was deleted is defiend', () => {
      expect(info.deleteProduct).toBeDefined()
    })

    it('should getProductBycategory method is defiend', () => {
      expect(info.getProductBycategory).toBeDefined()
    })
  })
  describe('servies of product working correctly', () => {
    const product: PRODCUT = {
      name: 'shampo',
      price: '50',
      category: 'cleaning'
    }
    beforeAll(async () => {
      const connect = await client.connect()
      const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
      await connect.query(sql)
      connect.release()
      const createProduct = await info.create(product)
      product.id = createProduct.id
    })
    afterAll(async () => {
      const connect = await client.connect()
      const sql = 'DELETE FROM products'
      await connect.query(sql)
      connect.release()
    })
    it(' index method should return all products', async () => {
      const products = await info.index()
      //console.log(products);

      expect(products.length).toBe(1)
    })

    it(' show method should return one product have this id', async () => {
      const productById = (await info.show(product.id as number)) as PRODCUT
      expect(productById.name).toBe(product.name)
      expect(productById.price).toEqual(product.price)
      expect(productById.category).toBe(product.category)
    })
    it(' create method should return new Product created', async () => {
      const Product: PRODCUT = {
        name: 'spongpop',
        price: '100',
        category: 'toies'
      }
      const newPtoduct = (await info.create(Product)) as PRODCUT
      expect(newPtoduct.name).toBe(Product.name)
      expect(newPtoduct.price).toEqual(Product.price)
      expect(newPtoduct.category).toBe(Product.category)
    })
    it(' getProductBycategory method should return products Of this Category', async () => {
      const productsOfCategory = (await info.getProductBycategory(
        product.category as string
      )) as PRODCUT[]
      expect(productsOfCategory[0].category).toBe(product.category)
    }),
      it('deleteProduct method should return deleted product', async () => {
        const deleteProduct = await info.deleteProduct(product.id as number)
        expect(deleteProduct).toEqual(product)
      })
  })
})
