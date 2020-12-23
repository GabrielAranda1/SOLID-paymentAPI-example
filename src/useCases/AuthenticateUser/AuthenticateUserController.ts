import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { validateUserAuthentication } from './AuthenticateUserValidations'

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body

    const validations = await validateUserAuthentication(cpf, password)

    if (Object.keys(validations).length > 0) return response.status(400).json(validations)

    try {
      const token = await this.authenticateUserUseCase.execute({
        cpf,
        password,
      })

      return response.status(200).json({ token: token })
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'An error occured while processing your request',
      })
    }
  }
}
