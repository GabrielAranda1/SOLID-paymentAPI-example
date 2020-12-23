import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { validateCreateUserRequest } from './CreateUserValidations'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, lastname, cpf, password, balance } = request.body

    // Validate Request parameters
    const validations = await validateCreateUserRequest({ name, lastname, cpf, password, balance })

    if (Object.keys(validations).length > 0) return response.status(400).json(validations)

    try {
      await this.createUserUseCase.execute({
        name,
        lastname,
        cpf,
        password,
        balance,
      })

      return response.status(201).json({ message: 'User Created' })
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'An error occured while processing your request',
      })
    }
  }
}
