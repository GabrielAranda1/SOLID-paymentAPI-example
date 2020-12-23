import { Request, Response } from 'express'
import { decode } from '../../middlewares/auth'
import { CreateTransactionUseCase } from './CreateTransactionUseCase'
import { validateCreateTransaction } from './CreateTransactionValidations'

export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { receiver, value } = request.body

    const validations = await validateCreateTransaction(value, receiver) // validate user input

    if (Object.keys(validations).length > 0) return response.status(400).json(validations)

    const user = await decode(request)

    try {
      if (user === null) throw new Error('An error occured with your session')

      await this.createTransactionUseCase.execute({
        receiver,
        sender: user.cpf,
        sender_id: user.id,
        value,
      })

      return response.status(201).json({ message: 'Transaction Completed.' })
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'An error occured while processing your request',
      })
    }
  }
}
