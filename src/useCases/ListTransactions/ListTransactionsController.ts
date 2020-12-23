import { Request, Response } from 'express'
import { listTransactionsUseCase } from '.'
import { ListTransactionsUseCase } from './ListTransactionsUseCase'
import { validateListTransactionsRequest } from './ListTransactionsValidation'
import { decode } from '../../middlewares/auth'

export class ListTransactionsController {
  constructor(private listTransactionsUseCase: ListTransactionsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { from, to } = request.query

    const user = await decode(request)

    try {
      if (user === null) throw new Error('An error occured with your session')

      if (from === undefined || to === undefined)
        throw new Error('Please insert a valid time interval')

      const fromParsed = String(from)
      const toParsed = String(to)

      const validations = await validateListTransactionsRequest({ from: fromParsed, to: toParsed })

      if (Object.keys(validations).length > 0) return response.status(400).json(validations)

      const transactions = await listTransactionsUseCase.execute({
        from: fromParsed,
        to: toParsed,
        user_id: user.id,
      })

      return response.status(200).json(transactions)
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'An error occured while processing your request',
      })
    }
  }
}
