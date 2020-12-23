import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import decoder from 'jwt-decode'

export const auth = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ message: 'Unauthorized.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    await jwt.verify(token, String(process.env.JWT_TOKEN))
    next()
  } catch (err) {
    return response.status(401).json({ message: 'Session expired. Please login again.' })
  }
}

export const decode = async (request: Request) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return null
  }

  interface ITokenUser {
    id: string
    name: string
    lastname: string
    cpf: string
    iat: string
    exp: string
  }

  const [, token] = authHeader.split(' ')

  const user = decoder<ITokenUser>(token)

  return user
}
