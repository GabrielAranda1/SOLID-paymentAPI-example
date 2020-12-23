import { Request, Response } from 'express'
import { decode } from '../../middlewares/auth'
import { ReverseTransactionUseCase } from './ReverseTransactionUseCase'

export class ReverseTransactionController {
  constructor(private reverseTransactionUseCase: ReverseTransactionUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { transaction_id } = request.params

    const user = await decode(request)

    try {
      if (user === null) throw new Error('An error occured with your session')

      await this.reverseTransactionUseCase.execute({
        transaction_id,
        sender_id: user.id,
      })

      return response.status(200).json({ message: 'Transaction Reversed.' })
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'An error occured while processing your request',
      })
    }
  }
}
