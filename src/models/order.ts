import client from '../database'
export type ORDER = {
  id?: number
  product_id?: number
  user_id?: number
  order_id?: number
  quantity: number
  status_order: string
}
export class orderInfo {
  table = 'orders'
  async getOrders(userId: number): Promise<ORDER[]> {
    try {
      const connect = await client.connect()
      const sql = `SELECT * FROM orders WHERE user_id=$1`
      const result = await connect.query(sql, [userId])
      connect.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get all orders of user. Error: ${err}`)
    }
  }
  async showCrruntOrder(user_id: number): Promise<ORDER> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=$1 ORDER BY id DESC LIMIT 1'
      const connect = await client.connect()
      const res = await connect.query(sql, [user_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not get user${error}`)
    }
  }
  async getActiveOrdersByUserId(userId: number): Promise<ORDER[]> {
    try {
      const status = 'active'
      const connect = await client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status_order = $2'
      const result = await connect.query(sql, [userId, status])
      connect.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get active order. Error: ${err}`)
    }
  }

  // select completed order by user id
  async getCompletedOrdersByUserId(userId: number): Promise<ORDER[]> {
    try {
      const status = 'complete'
      const connect = await client.connect()
      //const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} AND status_order = $1`;
      // const result = await connect.query(sql, [status]);
      const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status_order = $2'
      const result = await connect.query(sql, [userId, status])
      connect.release()
      //console.log(result.rows);
      return result.rows
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`)
    }
  }

  async createOrder(user_id: number, status_order: string): Promise<ORDER> {
    try {
      const connect = await client.connect()
      const sql = 'INSERT INTO orders (user_id, status_order) VALUES($1, $2) RETURNING *'
      const result = await connect.query(sql, [user_id, status_order])
      connect.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`)
    }
  }

  async addProduct(product_id: number, order_id: number, quantity: number): Promise<ORDER> {
    try {
      const connect = await client.connect()
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const result = await connect.query(sql, [quantity, order_id, product_id])
      connect.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add product to order. Error: ${err}`)
    }
  }

  async updateOrderStatus(status: string, orderId: number): Promise<ORDER> {
    try {
      const connect = await client.connect()
      //id of order
      const sql = 'UPDATE orders SET status_order = $1 WHERE id = $2 RETURNING *'
      const result = await connect.query(sql, [status, orderId])
      connect.release()
      //console.log(result.rows[0]);

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`)
    }
  }
  async deleteOrder(id: number): Promise<ORDER> {
    try {
      const connect = await client.connect()
      const sql = 'DELETE FROM orders WHERE id= $1 RETURNING *'
      const result = await connect.query(sql, [id])
      connect.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }
}
