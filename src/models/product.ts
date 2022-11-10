import client from '../database'

export type PRODCUT = {
  id?: number
  name: string
  price: string
  category: string
}
export class prodcutInfo {
  // show all users
  async index(): Promise<PRODCUT[]> {
    try {
      const connect = await client.connect()
      const sql = 'SELECT * FROM products'
      const res = await connect.query(sql)
      connect.release()
      return res.rows
    } catch (error) {
      throw new Error(`can not get products ${error}`)
    }
  }
  //show by id
  async show(id: number): Promise<PRODCUT> {
    try {
      const sql = 'SELECT * FROM products WHERE id = $1'
      const connect = await client.connect()
      const res = await connect.query(sql, [id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not get product ${error}`)
    }
  }
  // select product by category
  async getProductBycategory(category: string): Promise<PRODCUT[]> {
    try {
      const connect = await client.connect()
      const sql = 'SELECT * FROM products WHERE category = $1'
      const result = await connect.query(sql, [category])
      connect.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get product by category. Error: ${err}`)
    }
  }
  async create(product: PRODCUT): Promise<PRODCUT> {
    try {
      const { name, price, category } = product

      const connect = await client.connect()
      const sql = `INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *`
      const res = await connect.query(sql, [name, price, category])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not create prodcut${error}`)
    }
  }
  async deleteProduct(id: number): Promise<PRODCUT> {
    try {
      const sql = 'DELETE  FROM products WHERE id = $1 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not delete product ${error}`)
    }
  }
}

/*{
    "name":"Earl Sofa",
    "price":100,
    "category":"Sofas"
}
 */
