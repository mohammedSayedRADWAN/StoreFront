import { USER, userInfo } from '../../models/user'
import client from '../../database'
const info = new userInfo()
describe('User model', () => {
  describe('serves of user are exisit', () => {
    it('should create method that return user was created is defiend', () => {
      expect(info.create).toBeDefined()
    })

    it('should index method that return all users is defiend', () => {
      expect(info.index).toBeDefined()
    })
    it('should show method that return specifc user by id is defiend', () => {
      expect(info.show).toBeDefined()
    })

    it('should deleteUser method that return user was deleted is defiend', () => {
      expect(info.deleteUser).toBeDefined()
    })

    it('should athuntication method is defiend', () => {
      expect(info.athuntication).toBeDefined()
    })
  }),
    describe('servies of user working correctly', () => {
      const user: USER = {
        firstname: 'maged',
        password_digest: '12345',
        lastname: 'ahamed'
      }
      beforeAll(async () => {
        const connect = await client.connect()
        const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
        await connect.query(sql)
        connect.release()
        const createUser = await info.create(user)
        user.id = createUser.id
      })
      afterAll(async () => {
        const connect = await client.connect()
        const sql = 'DELETE FROM users'
        await connect.query(sql)
        connect.release()
      })
      it('should index method should return all users', async () => {
        const users = await info.index()
        //console.log(users);

        expect(users.length).toBe(1)
      })

      it('should show method should return one user have this id', async () => {
        const userById = (await info.show(user.id as number)) as USER
        expect(userById.firstname).toBe(user.firstname)
        expect(userById.lastname).toBe(user.lastname)
        expect(userById.id).toBe(user.id)
      })
      it('should create method should return user created', async () => {
        const User: USER = {
          id: 2,
          firstname: 'younis',
          password_digest: '12345',
          lastname: 'shapan'
        }
        const newUser = (await info.create(User)) as USER
        expect(newUser.firstname).toBe(User.firstname)
        expect(newUser.lastname).toBe(User.lastname)
        expect(newUser.id).toBe(User.id)
      })
      it('should athuntication method should return authinticated user', async () => {
        const auth = (await info.athuntication(
          user.firstname as string,
          user.password_digest as string
        )) as USER
        expect(auth.firstname).toBe(user.firstname)
        expect(auth.id).toBe(user.id)
        expect(auth.lastname).toBe(user.lastname)
      }),
        it('should athuntication method should return null', async () => {
          const auth = await info.athuntication('qwr', '9837847')
          expect(auth).toBe(null)
        })
    })
})
