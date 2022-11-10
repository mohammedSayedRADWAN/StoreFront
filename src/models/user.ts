import client from '../database'
import bcrypt from 'bcrypt'

export type USER = {
  id?: number
  firstname: string
  password_digest: string
  lastname: string
}
export class userInfo {
  //get all users
  async index(): Promise<USER[]> {
    try {
      const connect = await client.connect()
      const sql = 'SELECT * FROM users'
      const res = await connect.query(sql)
      connect.release()
      return res.rows
    } catch (error) {
      throw new Error(`can not get users ${error}`)
    }
  }
  // get user by id
  async show(id: number): Promise<USER> {
    try {
      const sql = 'SELECT * FROM users WHERE id = $1'
      const connect = await client.connect()
      const res = await connect.query(sql, [id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not get user${error}`)
    }
  }
  async create(user: USER): Promise<USER> {
    try {
      const { firstname, password_digest, lastname } = user
      const pepper: string = process.env.BCRYPT_PASSWWORD as string
      const salt: string = process.env.SALT_ROUNDS as string
      const hashPassword: string = bcrypt.hashSync(
        password_digest + pepper,
        parseInt(salt)
      )
      const connect = await client.connect()
      const sql =
        'INSERT INTO users (firstname, password_digest, lastname) VALUES($1, $2, $3) RETURNING *'
      const res = await connect.query(sql, [firstname, hashPassword, lastname])
      connect.release()
      //console.log( res.rows[0]);
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not create user${error}`)
    }
  }
  async deleteUser(id: number): Promise<USER[]> {
    try {
      const sql = 'DELETE  FROM users WHERE id = $1 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not delet user ${error}`)
    }
  }

  async athuntication(firstName: string, password: string): Promise<USER | null> {
    try {
      const sql = 'SELECT * FROM users WHERE firstname = $1'
      const conn = await client.connect()
      const res = await conn.query(sql, [firstName])
      const pepper: string = process.env.BCRYPT_PASSWWORD as string
      conn.release()

      if (res.rows.length) {
        const user = res.rows[0] as USER

        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user
        }
      }
      return null
    } catch (error) {
      throw new Error(`can not athunticate user ${error}`)
    }
  }
}
