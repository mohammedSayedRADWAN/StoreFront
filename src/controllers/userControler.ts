import { USER, userInfo } from '../models/user'
import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
const info = new userInfo()
export const index = async (req: Request, res: Response) => {
  try {
    const users = await info.index()

    if (!users) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any users ,yet,please create users first'
      })
    }
    return res.json({
      status: 'success',
      message: 'users show successed',
      data: { users }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

//show by id
export const show = async (req: Request, res: Response) => {
  try {
    const user = await info.show(req.body.id)
    

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    return res.json({
      status: 'success',
      message: 'user show successed',
      data: { user }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
export const create = async (req: Request, res: Response) => {
  try {
    const user: USER = {
      firstname: req.body.firstname,
      password_digest: req.body.password_digest,
      lastname: req.body.lastname
    }
    //console.log(user);

    const newUser = await info.create(user)
    //console.log(newUser);

    const tokenSecret = jwt.sign(newUser, process.env.TOKEN_SECRET as Secret)
    return res.json({
      status: 'success',
      message: 'user created success',
      data: { ...newUser, tokenSecret }
    })
    //res.json(newUser)
  } catch (err) {
    res.status(500)
    res.json((err as Error).message)
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await info.deleteUser(req.body.id)
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    return res.json({
      status: 'success',
      message: 'user delete successed',
      data: { deleted }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
export const cheak = async (req: Request, res: Response) => {
  try {
    const user = await info.athuntication(req.body.firstname, req.body.password_digest)
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'password is unvalid'
      })
    }
    const tokenSecret = jwt.sign({ user }, process.env.TOKEN_SECRET as Secret)
    return res.json({
      status: 'success',
      message: 'user authenticated success',
      data: { ...user, tokenSecret }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
/*{
     "id": 12,
    "firstName": "maged",
    "password_digest":"12345",
    "lastNAME":"sayed"
} */
