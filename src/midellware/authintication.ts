import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const verify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerAuth = req.headers.authorization
    const token = (headerAuth as string).split(' ')[1]
    // console.log(token)
    jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    next()
  } catch (error) {
    res.status(401)
    res.json(`Access denied invalid token ${error}`)
    return
  }
}

export const hashing = (password: string) => {
  const pepper: string = process.env.BCRYPT_PASSWWORD as string
  const salt: string = process.env.SALT_ROUNDS as string
  const hashPassword: string = bcrypt.hashSync(password + pepper, parseInt(salt))

  return hashPassword
}
